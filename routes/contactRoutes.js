const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  postContact,
  updateContact,
  deleteContact,
} = require("../controlers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

// router.route("/").get(getContacts);

// router.route("/:id").get(getContact);

// router.route("/").post(postContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);

// to protect all routes private :
router.use(validateToken)
router.route("/").get(getContacts).post(postContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// router.route("/:id").delete((req, res) => {
//   res.status(200).json({ message: `deleted ${req.params.id}` });
// });

module.exports = router;
