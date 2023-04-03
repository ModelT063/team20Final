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
            db.query("SELECT a.Catalog_ID, Catalog_Name, iTunes_Endpoint->'$.ids' as catalog FROM CatalogSettings a INNER JOIN SponsorOrganizations b ON a.Catalog_ID = b.Catalog_ID WHERE b.Sponsor_Org_ID = ?",
            [
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