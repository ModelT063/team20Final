import {db} from "@/lib/db";
import { CatalogSettings } from "@/types/catalogsettings";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const newCatalog: CatalogSettings = req.body;
        db.connect( (err) => {
            if (err) throw err;
            db.query("INSERT INTO CatalogSettings VALUES (?, ?, ?)", 
            [
                0,
                newCatalog.Catalog_Name,
                '{"ids": []}',
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