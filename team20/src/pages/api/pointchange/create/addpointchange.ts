import {db} from "@/lib/db";
import { PointChange } from '@/types/pointchange'
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const newPointChange: PointChange = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("INSERT INTO PointChanges VALUES (?, ?, ?, ?, ?)", 
            [
                0,
                newPointChange.Point_Change,
                newPointChange.Change_Reason,
                new Date(),
                newPointChange.User_ID
            ], (error: any, results: any, fields: any) => {
                if (error) throw error;
                return res.status(200).json(results);
            });
        });
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
}