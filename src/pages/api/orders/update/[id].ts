// this endpoint will be used to update information for an order based on the order_ID
import {db} from "@/lib/db";
import { Order } from "@/types/order";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const updatedOrder: Order = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("UPDATE Orders SET Order_Status = ?, Product = ?, Order_Time = ? WHERE Order_ID = ?",
            [
                updatedOrder.Order_Status,
                updatedOrder.Product,
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