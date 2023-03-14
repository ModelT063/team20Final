// this endpoint will be to retrieve an order history for a specific user_id
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
            db.query("SELECT Order_ID, Order_Status, Product, Order_Time FROM Orders WHERE User_ID = ?",
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