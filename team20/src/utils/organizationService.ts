import {db} from "@/lib/db";

export default async function loadOrganizations() {
    const res = await fetch('http://localhost:3000/api/sponsororganization/read')
    const orgs = await res.json();
    return orgs;
}