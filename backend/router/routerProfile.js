import { Router } from "express";
import { register } from "../controller/controllerRegister.js";
import { loginUser } from "../controller/controllerLogin.js";
import isAuth from "../middleware/isAuth.js";
import { getListe } from "../controller/controllerUsersListe.js";
import { validateSchema } from "../validation/schemaValidation.js";
import { loginValidator, registerValidator } from "../validation/validation.js";
import { protokollForumular } from "../controller/ControllerProtokoll.js";
import { getHistorieProtokoll } from "../controller/controllerProtokollHistorie.js";
import { convertToPdf } from "../controller/controllerPdf.js";
import dotenv from "dotenv";

const router = Router();
import axios from "axios";

router.post("/register", registerValidator, validateSchema, register);
router.post("/login", loginValidator, validateSchema, loginUser);
router.get("/usersList", isAuth, getListe);
router.get("/protokoll", isAuth, getHistorieProtokoll);
router.get("/protokoll/:id", convertToPdf);
router.post("/protokoll", isAuth, protokollForumular);
router.post("/slackpost", async (req, res, next) => {
  try {
    const message = req.body.message; // Extract 'message' from the POST request body

    if (!message) {
      return res
        .status(400)
        .send("Message field is missing in the request body");
    }

    await axios.post(process.env.SLACK, {
      text: message, // Use the extracted 'message' value
    });

    res.send("Message sent to Slack successfully");
  } catch (error) {
    res.send("Failed to send message to Slack");
  }
});

export default router;
