import {db} from "@/lib/db";
import { Sponsor_Driver_Relationship } from "@/types/sponsor_driver_relationship";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const updatedApplication: Sponsor_Driver_Relationship = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("UPDATE OrgDriverRelationship SET Application_Time_Submitted = ?, Relationship_Status = ?, " + 
            " Application_Document = ? WHERE SD_Relationship_ID = ?", 
            [
                updatedApplication.Application_Time_Submitted,
                updatedApplication.Relationship_Status,
                updatedApplication.Application_Document,
                parseInt(req.query.id as string)
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