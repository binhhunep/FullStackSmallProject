import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("../views/test/aboutPage.ejs");
};

let getCRUD = (req, res) => {
  return res.render("../views/crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("Post CRUD from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  console.log("....................................");
  console.log(data);
  console.log("....................................");
  return res.render("../views/displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = (req, res) => {
  return res.send("hello getEditCRUD Page");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
};
