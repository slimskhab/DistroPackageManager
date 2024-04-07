use actix_web::{get, web, App, HttpResponse,HttpRequest, HttpServer};

#[get("/{path:.*}")]
async fn download_url(req: HttpRequest, path: web::Path<String>) -> HttpResponse {
    let host = req
        .headers()
        .get("host")
        .and_then(|value| value.to_str().ok())
        .unwrap_or("localhost:8000"); 
    let protocol = req.connection_info().scheme().to_string(); 
    let file_path = path.into_inner();
    let download_url = format!("{}://{}/{}", protocol, host, file_path);

    HttpResponse::Ok().body(download_url)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(download_url)
    })
    .bind(("127.0.0.1", 8080))? // Change the address and port as needed
    .run()
    .await
}
