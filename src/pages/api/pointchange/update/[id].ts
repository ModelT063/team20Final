// this will update a specific point_change record based on the point_change_ID
import {db} from "@/lib/db";
import { PointChange } from "@/types/pointchange";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const updatedPointChange: PointChange = req.body;
        db.connect( (err) => {
            db.query("UPDATE PointChanges SET Point_Change = ?, Change_Reason = ?, Change_Time = ? " + 
            " WHERE Point_Change_ID = ?", 
            [
                updatedPointChange.Point_Change,
                updatedPointChange.Change_Reason,
                new Date(),
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