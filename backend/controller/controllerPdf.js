import {Protocoll} from "../model/modelSchema.js";
import pdf from "../middleware/pdf.js"
import puppeteer from "puppeteer";
/**
 * Handle request to some endpoint
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */

export const convertToPdf = async (req, res) => {
    try {
    const { id } = req.params;

        const protocoll = await Protocoll.findOne({uuid: id});
        if (!protocoll) {
            res.status(404).json({message: "Protocoll not found"});
            return;
        }
        pdf(protocoll,res)
//res.status(200).json(protocoll.thema);

       console.log(protocoll)
    }catch (err) {
        console.error(err.message);
    }}