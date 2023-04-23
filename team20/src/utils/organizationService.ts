import {db} from "@/lib/db";

export default async function loadOrganizations() {
    const res = await fetch(`${process.env.APP_URL}/api/sponsororganization/read`)
    const orgs = await res.json();
    return orgs;
}