export enum ChangeType {

} // we'll need to define the different types 

export type PasswordChange = {
    Password_Change_ID?: number,
    Change_Time: Date,
    Change_Type: ChangeType,
    User_ID?: string
}