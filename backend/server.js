const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const path  = require('path')

dotenv.config();
const app = express();
const port = 5001;
app.use(cors({
  origin: true,
  credentials: true
}));


app.use(bodyParser.json());
const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../frontend/dist");

app.use(express.static(buildPath))




const BackEndRouter = require("./routes/BackEndRoutes")
app.use("/backend", BackEndRouter)


const RepositoryRouter = require("./routes/RepositoryRoutes")
app.use("/repository", RepositoryRouter)


const UserRouter = require("./routes/UserRoutes")
app.use("/user", UserRouter)

const NotificationRouter = require("./routes/NotificationRoutes")
app.use("/notification", NotificationRouter)

const PackageRouter = require("./routes/PackageRoutes");
const { downloadPackage } = require('./controllers/PackageController');
app.use("/package", PackageRouter)

mongoose.connect(process.env.DBURI);

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get("/:path*",downloadPackage)

app.get("/*", function(req, res){
  res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html"),
      function (err) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
      }
    );

})
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
