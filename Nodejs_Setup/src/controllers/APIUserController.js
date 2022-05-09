import APIUserService from "../services/APIUserService";

let checkLogin = async (req, res) => {
  let user = req.body;
  let message = await APIUserService.checkLoginService(user);
  return res.status(200).json({ message });
};

let addNewUser = async (req, res) => {
  let user = req.body;
  let message = await APIUserService.addNewUserService(user);
  return res.status(200).json({ message });
};

let showUser = async (req, res) => {
  let id = req.query.id;
  let message = await APIUserService.showUserService(id);
  return res.status(200).json({ message });
};

let showEditUser = async (req, res) => {
  let id = req.query.id;
  let message = await APIUserService.showEditUserService(id);
  return res.status(200).json(message);
};

let updateEditUser = async (req, res) => {
  let user = req.body;
  let id = req.query.id;
  let message = await APIUserService.updateEditUserService(id, user);
  return res.status(200).json(message);
};

let deleteUser = async (req, res) => {
  let id = req.query.id;
  let message = await APIUserService.deleteUserService(id);
  return res.status(200).json(message);
};
module.exports = {
  addNewUser: addNewUser,
  checkLogin: checkLogin,
  showUser: showUser,
  showEditUser: showEditUser,
  updateEditUser: updateEditUser,
  deleteUser: deleteUser,
};
