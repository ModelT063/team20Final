import {db} from "@/lib/db";
import { SponsorOrganization, OrganizationStatus } from "@/types/sponsororganization";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const newOrganization: SponsorOrganization = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("INSERT INTO SponsorOrganizations VALUES (?, ?, ?, ?, ?)", 
            [
                0,
                newOrganization.Organization_Name,
                newOrganization.Points_Ratio,
                newOrganization.Address,
                newOrganization.Organization_Status,
                newOrganization.Catalog_ID
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