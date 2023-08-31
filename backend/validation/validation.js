import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 25 })
    .escape()
    .exists()
    .notEmpty() //etwas wie required
    .withMessage("enter your name"),
  body("email")
    .trim()
    .escape()
    .isEmail()
    .exists()
    .notEmpty()
    .withMessage("Email is not valid")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6, max: 25 })
    .withMessage("Please enter at least 6 characters and a maximum of 25.."),
  body("role").exists().notEmpty().withMessage("enter your role"),
];

export const loginValidator = [
  body("email")
    .trim()
    .escape()
    .isEmail()
    .exists()
    .notEmpty()
    .withMessage("Email is not valid")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6, max: 25 })
    .withMessage("Please enter at least 6 characters and a maximum of 25."),
];
