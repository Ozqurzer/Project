import { User } from "../model/modelSchema.js";

export const getListe = async (req, res) => {
  try {
    const result = await User.find();
    res.status(201).send(result);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};
