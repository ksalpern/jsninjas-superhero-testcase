import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
  body("fullName", "Specify your name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar URL").optional().isURL(),
];
export const heroCreateValidation = [
  body("nickName", "Enter article title").isLength({ min: 3 }).isString(),
  body("realName", "Enter article title").isLength({ min: 3 }).isString(),
  body("description", "Enter article title").isLength({ min: 3 }).isString(),
  body("catchPhrase", "Enter article title").isLength({ min: 3 }).isString(),
  body("tags", "Invalid tag format").optional().isString(),
  body("imageUrl", "Not valid image URL").optional().isString(),
];
