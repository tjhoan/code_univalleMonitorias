require("dotenv").config();
const express = require("express"); 
const path = require("path"); 
const morgan = require("morgan"); 
const mysql = require("mysql"); 
const myConnection = require("express-myconnection"); 

const app = express();

// Importing routes
const monitoresRoutes = require("./routes/monitores.js");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: process.env.PASSWORD,
      port: 3306,
      database: process.env.DATABASE,
    },
    "single"
  )
);

app.use(express.urlencoded({ extended: false }));

// // Routes
app.use("/", monitoresRoutes);

// // Static Files
app.use("/public", express.static("public"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${process.env.PORT || 3000}`)
});