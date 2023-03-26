import {db} from "@/lib/db";
import { CatalogSettings } from "@/types/catalogsettings";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        console.log(req.body);
        const updatedCatalog: CatalogSettings = req.body;
        console.log(updatedCatalog.iTunes_Endpoint);
        db.connect( (err) => {
            if (err) throw err;
            db.query("UPDATE CatalogSettings SET Catalog_Name = ?, iTunes_Endpoint = ? WHERE Catalog_ID = ?", 
            [
                updatedCatalog.Catalog_Name,
                JSON.stringify(updatedCatalog.iTunes_Endpoint),
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
};