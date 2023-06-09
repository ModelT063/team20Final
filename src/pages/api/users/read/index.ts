import {db} from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse ) => {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        db.connect( (err) => {
            if (err) throw err;
            db.query("SELECT Email, User_Type, F_Name, L_Name, Points FROM Users WHERE User_Status = ? LIMIT 20",
            [
                1
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