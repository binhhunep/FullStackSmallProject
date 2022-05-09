import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let checkLoginService = (currentUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (currentUser.email) {
        let isEmailExist = await checkEmailExist(currentUser.email);
        if (isEmailExist && isEmailExist === true) {
          if (currentUser.password) {
            let user = await db.User.findOne({
              where: { email: currentUser.email },
            });
            await bcrypt.compare(
              currentUser.password,
              user.password,
              (err, res) => {
                if (res === true) {
                  resolve({
                    errCode: 0,
                    errMessage: "Login succeeds!",
                  });
                } else {
                  resolve({ errCode: 4, errMessage: "Password wrong!" });
                }
              }
            );
          } else {
            resolve({
              errCode: 3,
              errMessage: "Missing parameter (user's password)!",
            });
          }
        } else {
          resolve({ errCode: 2, errMessage: "User not found!" });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter (user's email)!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let addNewUserService = (currentUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (currentUser.email) {
        let isEmailExist = await checkEmailExist(currentUser.email);
        if (isEmailExist === false) {
          if (currentUser.password) {
            let hashPasswordFromBcrypt = await hashUserPassword(
              currentUser.password
            );
            await db.User.create({
              email: currentUser.email,
              password: hashPasswordFromBcrypt,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              address: currentUser.address,
              phoneNumber: currentUser.phoneNumber,
              gender: currentUser.gender === "1" ? true : false,
              roleId: currentUser.roleId,
            });
            let users = await db.User.findAll({
              attributes: { exclude: ["password"] },
            });
            resolve({
              errCode: 0,
              errMessage: "Create new user succeeds!",
              users,
            });
          } else {
            resolve({
              errCode: 3,
              errMessage: "Missing parameter (user's password)!",
            });
          }
        } else {
          resolve({ errCode: 2, errMessage: "User's email was exist!" });
        }
      }
      resolve({ errCode: 1, errMessage: "Missing parameter (user's email)!" });
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmailExist = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isEmailExist = true;
      let user = await db.User.findOne({ where: { email: email } });
      if (!user) {
        isEmailExist = !isEmailExist;
      } else {
        resolve(isEmailExist);
      }
      resolve(isEmailExist);
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let showUserService = (currentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (currentId) {
        if (currentId === "ALL") {
          let users = await db.User.findAll({
            attributes: { exclude: ["password"] },
          });
          resolve({ errCode: 0, errMessage: "Get all users succeeds!", users });
        } else {
          let user = await db.User.findOne({
            where: { id: currentId },
          });
          if (user) {
            resolve({ errCode: 3, errMessage: "Get one user succeeds!", user });
          } else {
            resolve({ errCode: 2, errMessage: "User not found!" });
          }
        }
      } else {
        resolve({ errCode: 1, errMessage: "Missing parameter (User-id)!" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let showEditUserService = (currentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (currentId) {
        let user = await db.User.findOne({
          where: { id: currentId },
          attributes: { exclude: ["password"] },
        });
        if (user) {
          resolve({
            errCode: 0,
            errMessage: "Plz edit new information!",
            user,
          });
        } else {
          resolve({ errCode: 2, errMessage: "User not found!" });
        }
      } else {
        resolve({ errCode: 1, errMessage: "Missing prameter (User-id)!" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateEditUserService = (currentId, currentUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (currentId) {
        let user = await db.User.findOne({
          where: { id: currentId },
        });
        if (user) {
          user.firstName = currentUser.firstName;
          user.lastName = currentUser.lastName;
          user.address = currentUser.address;
          user.phoneNumber = currentUser.phoneNumber;
          user.gender = currentUser.gender;
          user.roleId = currentUser.roleId;
          await user.save();
          console.log(">>>check user", user);
          resolve({
            errCode: 0,
            errMessage: "Update information succeeds!",
            user,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "User not found!",
          });
        }
      } else {
        resolve({ errCode: 1, errMessage: "Missing parameter (User-id)!" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserService = (currentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (currentId) {
        let user = await db.User.findOne({ where: { id: currentId } });
        if (user) {
          await db.User.destroy({ where: { id: currentId } });
          let users = await db.User.findAll();
          resolve({ errCode: 0, errMessage: "Delete succeeds!", users });
        } else {
          resolve({ errCode: 2, errMessage: "User not found!" });
        }
      } else {
        resolve({ errCode: 1, errMessage: "Missing parameter (User-id)!" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addNewUserService: addNewUserService,
  checkLoginService: checkLoginService,
  showUserService: showUserService,
  showEditUserService: showEditUserService,
  updateEditUserService: updateEditUserService,
  deleteUserService: deleteUserService,
};
