use actix_web::{get, web, App, HttpResponse, HttpRequest, HttpServer};
use futures_util::stream::{Stream, StreamExt};
use std::fs::{self, File};
use std::io::{self, Write};
use std::path::Path;
use std::pin::Pin;
use std::task::{Context, Poll};
struct PrintStream<S> {
    inner: S,
    file: File,
}

impl<S> Stream for PrintStream<S>
where
    S: Stream<Item = Result<actix_web::web::Bytes, reqwest::Error>> + Unpin,
{
    type Item = Result<actix_web::web::Bytes, reqwest::Error>;

    fn poll_next(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<Self::Item>> {
        match Pin::new(&mut self.inner).poll_next(cx) {
            Poll::Ready(Some(Ok(chunk))) => {
                // Print each byte in hexadecimal format
               let _= self.file.write_all(&chunk);
                
                Poll::Ready(Some(Ok(chunk)))
            }
            other => other,
        }
    }
}

#[get("/{path:.*}")]
async fn download_url(req: HttpRequest, path: web::Path<String>) -> HttpResponse {

    let file_path = path.into_inner();

    if let Ok(file_content) = fs::read(&file_path) {
        println!("returned file directly");
        return HttpResponse::Ok()
            .content_type("application/octet-stream")
            .body(file_content);
    }

    let host = req
        .headers()
        .get("host")
        .and_then(|value| value.to_str().ok())
        .unwrap_or("localhost:8000");
    let protocol = req.connection_info().scheme().to_string();
    let download_url = format!("{}://{}/{}", protocol, host, file_path);

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert(
        reqwest::header::CONTENT_TYPE,
        reqwest::header::HeaderValue::from_static("application/octet-stream"),
    );
    headers.insert(
        reqwest::header::CONTENT_DISPOSITION,
        format!("attachment; filename={}", "filename").parse().unwrap(),
    );

    println!("{}", download_url);

    let response = match reqwest::Client::new()
        .get(&download_url)
        .headers(headers)
        .send()
        .await
    {
        Ok(response) => response,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    if !response.status().is_success() {
        return HttpResponse::InternalServerError().finish();
    }

    let stream = response.bytes_stream();

    if let Some(parent) = Path::new(&file_path).parent() {
        if let Err(err) = fs::create_dir_all(parent) {
            eprintln!("Error creating directories: {:?}", err);
            return HttpResponse::InternalServerError().finish();
        }
    }

    // Open the file using the file_path
    let file = match File::create(&file_path) {
        Ok(file) => file,
        Err(err) => {
            eprintln!("Error creating file: {:?}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };

    let print_stream = PrintStream { inner: stream, file };

    HttpResponse::Ok()
        .content_type("application/octet-stream")
        .streaming(print_stream)
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    HttpServer::new(|| App::new().service(download_url))
        .bind(("192.168.1.59", 8080))? // Change the address and port as needed
        .run()
        .await
}