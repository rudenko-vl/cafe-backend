import { body } from "express-validator";

export const registerValidation = [
  body("email", "Не вірний формат пошти").isEmail(),
  body("password", "Мінімум три символи").isLength({ min: 3 }),
  body("name", "Мінімум два символи").isLength({ min: 2 }),
  body("avatarUrl", "Не вірне посилання").optional().isURL(),
];

export const loginValidation = [
  body("email", "Не вірний формат пошти").isEmail(),
  body("password", "Мінімум три символи").isLength({ min: 3 }),
];

export const createPersonValidation = [
  body("name", "Мінімум три символи").isLength({ min: 3 }).isString(),
];
