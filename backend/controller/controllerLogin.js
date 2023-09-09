import {User} from "../model/modelSchema.js";
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
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res
                .status(404)
                .send({success: false, error: "User/Password Combination not found"});
        }
        const isPasswordValid = await user.isPasswordValid(password);
        if (!isPasswordValid) {
            return res
                .status(404)
                .send({success: false, error: "Password not found"});
        }
        const token = jwt.sign({id: user._id, "role": user.role}, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
            })

            .status(200)
            .json({
                success: true,
                token,
                msg: `User logged in`,
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            })
console.log(res.data)
    } catch (error) {
        res.status(500).send({success: false, error: error.message});
        console.error(error.message);
    }
};
