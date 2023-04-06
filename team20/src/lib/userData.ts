import { atom } from "recoil"

export const userInfoState = atom({
    key: "userInfo",
    default: []
});

export const userID = atom({
    key: "userID",
    default: ""
});