import { validationResult } from "express-validator";

export const validateSchema = (req, res, next) => {
  // validationResult liest die Fehler aus, die uns die middlerwares oben
  // zum Request-Object hinzugefügt haben
  const validationErrors = validationResult(req);
  // validationErrors ist nun ein Object, das u.a. die errors als Array enthält

  // console.debug("validationErrors", validationErrors)

  if (validationErrors.isEmpty()) {
    // wenn isEmpty true ist => keine Fehler
    next();
  } else {
    res.status(400).json({ errors: validationErrors.array() });
    // validationErrors.array() => hier stehen alle errors im array
  }
};
