import {db} from "@/lib/db";
import { Sponsor_Driver_Relationship, RelationshipStatus } from "@/types/sponsor_driver_relationship";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const newRelationship: Sponsor_Driver_Relationship = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("INSERT INTO OrgDriverRelationship VALUES (?, ?, ?, ?, ?, ?)", 
            [
                0,
                RelationshipStatus.pending,
                newRelationship.User_ID,
                newRelationship.Sponsor_Org_ID,
                Date(),
                newRelationship.Application_Document
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