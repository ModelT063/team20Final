import {db} from "@/lib/db";

export default async function loadOrganizations() {
    const res = await fetch(`api/sponsororganization/read`)
    const orgs = await res.json();
    return orgs;
}