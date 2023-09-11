import { User } from "../model/modelSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
/**
 * Handles the logout post request.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */

//login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, error: "User/Password Combination not found" });
    }
    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .send({ success: false, error: "Password not found" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    // isLogged Cookie speichert daher vor allem die Information,
    // wer eingeloggt ist, damit man es dann im Frontend bequem auslesen kann
    // zusätzlich beinhaltet es noch die Information, wann das JWT abläuft (expired)
    const payload = {
      expires: expiresInDate.toISOString(),
      id: user._id,
    };
    res.cookie("isLogged", payload);
    return res
      .status(200)
      .send({ success: true, msg: `User ${user.name} logged in` });

    /*.status(200)
            .json({
                success: true,
                token,
                msg: `User logged in`,
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            })*/
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
    console.error(error.message);
  }
};
