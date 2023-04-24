export enum ChangeType {
    admin_change = 0,
    user_change = 1
}

export type PasswordChange = {
    Password_Change_ID?: number,
    Change_Time: Date,
    Change_Type: ChangeType,
    User_ID?: string
}