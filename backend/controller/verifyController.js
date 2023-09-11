import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
/**
 * Handles the logout post request.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */

export const verifyController = async (req, res) => {
  const token = req.cookies.isLogged;

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, YOUR_SECRET_KEY);

    // Získejte uživatele z databáze na základě ID z tokenu.
    const user = await User.findById(decoded.id);

    if (!user) {
      // Uživatel nebyl nalezen v databázi.
      return res.status(404).json({ error: "User not found." });
    }

    // Odpovězte s daty uživatele.
    res.json({ data: user });
  } catch (err) {
    // Chyba při ověřování tokenu nebo při získávání uživatele z databáze.
    return res.status(401).json({ error: "Token is invalid or expired." });
  }
};
