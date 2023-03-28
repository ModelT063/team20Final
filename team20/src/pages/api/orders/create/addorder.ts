import {db} from "@/lib/db";
import {Order, OrderStatus} from "@/types/order"
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const newOrder: Order = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("INSERT INTO Orders VALUES (?, ?, ?, ?, ?, ?)",
            [
                0,
                newOrder.User_ID,
                newOrder.Point_Change_ID,
                OrderStatus.submitted,
                newOrder.Product,
                new Date()
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