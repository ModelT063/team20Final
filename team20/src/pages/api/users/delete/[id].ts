import {db} from "@/lib/db";
import { User, UserType, UserStatus } from "@/types/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "DELETE") {
        res.setHeader("Allow", ["DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        db.connect( (err) => {
            if (err) throw err;
            db.query("DELETE FROM Users WHERE User_ID = ?", 
            [
                (req.query.id as string)
            ], (error: any, results: any, fields: any) => {
                if (error) throw error;
                return res.status(200).json("User Deleted Successfully");
            });
        });
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
}