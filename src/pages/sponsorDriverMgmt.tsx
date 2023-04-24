import Navbar from "../components/Navbar";
import { Auth } from "aws-amplify";
import React, { Component, useState, useEffect } from "react";
import { UserType } from "@/types/user";
import NotFoundPage from "@/components/404";
import CircularProgress from "@mui/material/CircularProgress";
import { getInfo } from "@/utils/userService";
import { useRecoilValue } from "recoil";
import { userInfoState, userID } from "@/lib/userData";

class SponDriverMgmt extends Component {
  state = {
    userID: "",
    userType: "",
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(async (data) => {
      //   this.state.userID = await data.username;
      this.setState({ userID: await data.username });
      const res = await fetch(
        `${process.env.APP_URL}api/users/read/${this.state.userID}`
      );
      const info = await res.json();
      this.setState({ userType: info[0].User_Type });
    });
  }

  render() {
    return this.state.userType === "" ? (
      <>
        <Navbar />
        <CircularProgress />
      </>
    ) : parseInt(this.state.userType) != UserType.sponsor ? (
      <NotFoundPage />
    ) : (
      <>
        <Navbar />

        <a href="uploadS3">Upload Sponsor Organization Application</a>
      </>
    );
  }
}
export default SponDriverMgmt;
