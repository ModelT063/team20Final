// pass in user_id to get the name of their sponsor organization(s)
// not sure how to handle multiple requests that would all need user_Id using dynamic routes
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
            db.query("SELECT b.Organization_Name, a.Relationship_Status FROM OrgDriverRelationship a " + 
            "INNER JOIN SponsorOrganizations b ON a.Sponsor_Org_ID = b.Sponsor_Org_ID " +
            "WHERE b.Organization_Status = ? AND " +
            "a.User_ID = ?", 
            [
                1,
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