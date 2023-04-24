export enum OrganizationStatus {
    inactive = 0,
    active = 1,
}

export type SponsorOrganization = {
    Sponsor_Org_ID?: number;
    Organization_Name: string;
    Points_Ratio: number;
    Address: string;
    Catalog_ID?: number;
    Organization_Status: OrganizationStatus;
}