// this endpoint will be used to get a history of point changes for specific user
import {db} from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        db.connect( (err) => {
            if (err) throw err;
            db.query("SELECT Point_Change_ID, Point_Change, Change_Reason, Change_Time FROM PointChanges " + 
            "WHERE User_ID = ?", 
            [
                (req.query.id as string)
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