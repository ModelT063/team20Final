import {db} from "@/lib/db";
import { PasswordChange, ChangeType } from "@/types/passwordchange";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const newPasswordChange: PasswordChange = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("INSERT INTO PasswordChanges VALUES (?, ?, ?, ?)", 
            [
                0,
                new Date(),
                (newPasswordChange.Change_Type == ChangeType.admin_change ? ChangeType.admin_change : ChangeType.user_change),
                newPasswordChange.User_ID
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