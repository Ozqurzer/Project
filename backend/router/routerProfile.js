import { Router } from "express";
import { register } from "../controller/controllerRegister.js";
import { loginUser } from "../controller/controllerLogin.js";
import isAuth from "../middleware/isAuth.js";
import { getListe } from "../controller/controllerUsersListe.js";
import { validateSchema } from "../validation/schemaValidation.js";
import { loginValidator, registerValidator } from "../validation/validation.js";

const router = Router();

router.post("/register", registerValidator, validateSchema, register);
router.post("/login", loginValidator, validateSchema, loginUser);
router.get("/usersList", isAuth, getListe);

export default router;
