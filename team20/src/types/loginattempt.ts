export enum LoginStatus {
    failure = 0,
    successful = 1,
}

export type LoginAttempt = {
    Login_ID?: number,
    Username: string,
    Login_Status: LoginStatus,
    Login_Time: Date,
    User_ID?: string
}