import {db} from "@/lib/db";
import { User } from "@/types/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const updatedUser: User = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("UPDATE Users SET Email = ?, User_Type = ?, User_Status = ?," +
            "F_Name = ?, L_Name = ?, Points = ? WHERE User_ID = ?", 
            [
                updatedUser.Email,
                updatedUser.User_Type,
                updatedUser.User_Status,
                updatedUser.F_Name,
                updatedUser.L_Name,
                updatedUser.Points,
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
};