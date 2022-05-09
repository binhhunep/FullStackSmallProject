import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router(); //su dung express
// moi server la mot ung dung. truyen dau vao 1 ung dung server vao ham
let initWebRouters = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/contact", (req, res) => {
    return res.send("DOAN THANH BINH");
  });
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  return app.use("/", router);
};

module.exports = initWebRouters;
