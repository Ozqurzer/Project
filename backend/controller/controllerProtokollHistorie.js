import {Protocoll} from "../model/modelSchema.js";


export const getHistorieProtokoll = async (req, res) => {
    try {
        const result = await Protocoll.find();
        res.status(201).send(result);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}