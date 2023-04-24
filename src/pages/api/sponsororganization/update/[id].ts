import {db} from "@/lib/db";
import { SponsorOrganization, OrganizationStatus } from "@/types/sponsororganization";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const updatedOrganization: SponsorOrganization = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("UPDATE SponsorOrganizations SET Organization_Name = ?, Points_Ratio = ?, Address = ?, " + 
            "Organization_Status = ?, Catalog_ID = ? WHERE Sponsor_Org_ID = ?", 
            [
                updatedOrganization.Organization_Name,
                updatedOrganization.Points_Ratio,
                updatedOrganization.Address,
                updatedOrganization.Organization_Status,
                updatedOrganization.Catalog_ID,
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