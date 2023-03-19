const express = require("express");
const {
  postRegister,
  getCurrentUser,
  loginUser,
} = require("../controlers/userControllers");

const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", postRegister);

router.post("/login", loginUser);

router.get("/current", validateToken ,getCurrentUser);

module.exports = router;
