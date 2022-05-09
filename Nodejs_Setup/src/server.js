import express from "express";
import initWebRouters from "./routes/routeAdmin/web";
import bodyParser from "body-parser";
import connectDB from "./configs/connectDB";
//create app
require("dotenv").config();
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//create route
initWebRouters(app);
//check error connect DB
connectDB();

//create port localhost:

let port = process.env.PORT;
app.listen(port, () => {
  console.log("Nodejs App running on local PORT:", port);
});
