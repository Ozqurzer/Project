import { User } from "../model/modelSchema.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(400).json({ message: ["The email is already in use"] });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    const userSaved = await newUser.save();

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      email: userSaved.email,
      role: userSaved.role,
    });
  } catch (err) {
    console.error(err.message);
  }
};
