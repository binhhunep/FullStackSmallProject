import express from "express";
import APIUserController from "../../controllers/APIUserController";

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hello nodejs with Mr.Binh");
  });

  router.post("/api/admin/checkLogin", APIUserController.checkLogin);
  router.post("/api/admin/addNewUser", APIUserController.addNewUser);
  router.get("/api/admin/showUser", APIUserController.showUser);
  router.get("/api/admin/showEditUser", APIUserController.showEditUser);
  router.put("/api/admin/updateEditUser", APIUserController.updateEditUser);
  router.delete("/api/admin/deleteUser", APIUserController.deleteUser);

  return app.use("/", router);
};

module.exports = initWebRouters;
