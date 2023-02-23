const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/userModel");

// function to capitalize first letter for name
function capitalize(str) {
  const capitalizeString = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalizeString;
}

// function to check if there are numbers in password
function containNumbers(pass) {
  return /\d/.test(pass);
}

module.exports.REGISTER = async (req, res) => {
  const name = req.body.name;
  const nameCapitalize = capitalize(name);

  const email = req.body.email;
  const password = req.body.password;

  if (email.includes("@") && password.length >= 6 && containNumbers(password)) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserSchema({
      name: nameCapitalize,
      email: email,
      password: hashedPassword,
      bought_tickets: [],
    });

    user.save().then(async () => {
      const user = await UserSchema.findOne({ email: req.body.email });

      const token = jwt.sign(
        { name: user.name, email: user.email, userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        { algorythm: "RS256" }
      );

      return res.status(200).json({
        Message: "User registration was successfull.",
        jwt_token: token,
      });
    });
  } else {
    return res.status(400).json({
      Message:
        "Validation was unsuccessful. Email must contain @ and password must be at least 6 characters long with number(s). Please try again!",
    });
  }
};

module.exports.LOGIN = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isPasswordMatch) {
        const token = jwt.sign(
          { name: user.name, email: user.email, userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "24h" },
          { algorythm: "RS256" }
        );

        return res.status(200).json({
          message: "Login was successfull.",
          jwt_token: token,
          userName: user.name,
        });
      } else {
        return res.status(404).json({
          message: "Login was unsuccessfull. Check your email and password.",
        });
      }
    } else {
      return res.status(404).json({
        message: "Login was unsuccessfull. Check your email and password.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
