import {Protocoll} from "../model/modelSchema.js";

/**
 * Handle request to some endpoint
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */

export const protokollForumular = async (req, res) => {
    try {
        const { thema, datum, time, student } = req.body;


        const newProtokoll = new Protocoll({
          thema,
            datum,
            time,
            student
        });

        const protokollSaved = await newProtokoll.save();

        res.json({
            id: protokollSaved._id,
            thema: protokollSaved.thema,
            datum: protokollSaved.datum,
            time: protokollSaved.time,
            student: protokollSaved.student,
        });
    } catch (err) {
        console.error(err.message);
    }
}
