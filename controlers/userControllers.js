const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc post user registration
//@route POST api/user/register
//@access public

const postRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are  mandatory");
  }
  // if the user is avaoilable:
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Email has already exist");
  }
  // not available:

  const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log(`password : ${hashedPassword}`)
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`user created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400).json("User data is not valid");
  }

  res.json({ message: "User register successfully" });
});

//@desc post user login
//@route POST api/user/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});
//   res.status(201).json({ message: "Login successfully" });

//@desc get curent user
//@route GET api/user/current
//@access priavate

const getCurrentUser = asyncHandler(async (req, res) => {
  // res.json({ message: "I am the current user" });
  res.json(req.user);
});

module.exports = { postRegister, loginUser, getCurrentUser };
