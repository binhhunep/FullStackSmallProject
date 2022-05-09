import express from "express";
let configViewEngin = (app) => {
  app.use(express.static("./src/public")); //cho phep lay anh trong thu muc public theo duong dan
  app.set("view engin", "ejs"); //cho phep go cac cau lenh trong html
  app.set("views", "./src/views"); //set duong link de tim cac file ejs trong thu muc view
};
module.exports = configViewEngin;
