import { atom } from "recoil"

export const userInfoState = atom({
    key: "userInfo",
    default: []
});

export const userOrganizations = atom({
    key: "userOrganizations",
    default: []
});

export const userID = atom({
    key: "userID",
    default: ""
});