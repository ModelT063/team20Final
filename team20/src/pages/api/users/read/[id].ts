import {db} from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        db.connect( (err) => {
            if (err) throw err;
            db.query("SELECT Email, User_Type, User_Status, F_Name, L_Name, Points, Cart->'$.ids' as Cart FROM Users " +
            " WHERE User_ID = ?", 
            [
                (req.query.id as string),
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