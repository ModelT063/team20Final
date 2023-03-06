import {db} from "@/lib/db";
import { SponsorOrganization, OrganizationStatus } from "@/types/sponsororganization";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        db.connect( (err) => {
            if (err) throw err;
            db.query("SELECT Organization_Name, Points_Ratio, Address FROM SponsorOrganizations WHERE Organization_Status = ?", [
                1
            ],
            (error: any, results: any, fields: any) => {
                if (err) throw err;
                return res.status(200).json(results);
            });
        });
    } catch (e) {
        console.log(e);
        return res.status(500).end();
    }
}