const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");

// Project Model
const { User, validate } = require("../models/user.model");

router.route("/create").post( async (req, res) => {
  try {
    const { error } = validate(req.body);
    console.log(error);
    if (error)
    return res.status(400).send({ message: error });

      const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists" });

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: hashPassword,
  });

  newUser.save().then(() => res.json("User successfully created!"))
  
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// CREATE
/*
router.route("/create").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;
  // const password = req.body.password;

  const newUser = new User({
    name,
    email,
    role,
    //     password,
  });

  newUser
    .save()
    .then(() => res.json("User successfully created!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
*/


// READ
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((ticket) => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
