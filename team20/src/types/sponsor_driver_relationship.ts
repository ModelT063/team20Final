export enum RelationshipStatus {
    rejected = 0,
    accepted = 1,
    pending = 2,
    sponsor = 3
}

export type Sponsor_Driver_Relationship = {
    SD_Relationship_ID?: number;
    Relationship_Status: RelationshipStatus;
    User_ID?: string;
    Sponsor_Org_ID?: number;
    Application_Time_Submitted: Date;
    Application_Document: Blob;
}