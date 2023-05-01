import React, { Component, useState, useEffect } from "react";
import { UserType } from "@/types/user";
import NotFoundPage from "@/components/404";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar";
import { Auth } from "aws-amplify";

class CreateSponOrg extends Component {
  state = {
    spon_org_id: 0,
    org_name: "",
    points_ratio: 0.0,
    address: "",
    org_status: 0,
    cat_id: 0,
  };

  data_state = {
    userID: "",
    userType: "",
  };

  getRndInteger(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(async (data) => {
      this.data_state.userID = await data.username;
      const res = await fetch(`api/users/read/${this.data_state.userID}`);
      const info = await res.json();
      this.setState({ userType: info[0].User_Type });
    });
  }

  handleSubmit = async (event: any) => {
    const data = {
      Sponsor_Org_ID: this.getRndInteger(0, 9999),
      Organization_Name: this.state.org_name,
      Points_Ratio: this.state.points_ratio,
      Address: this.state.address,
      Organization_Status: this.state.org_status,
      Catalog_ID: this.getRndInteger(0, 9999),
    };

    console.log("sending to database..");
    fetch(`api/sponsororganization/create/addorganization`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success: ", data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    console.log("sending to database...");
  };

  onInputChange = (event: any) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <Navbar />

        <section className="section auth">
          <div className="container">
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    id="username"
                    aria-describedby="userNameHelp"
                    placeholder="Enter organization name"
                    value={this.state.org_name}
                    onChange={this.onInputChange}
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    type="number"
                    id="name"
                    aria-describedby="userNameHelp"
                    placeholder="Enter points ratio"
                    value={this.state.points_ratio}
                    onChange={this.onInputChange}
                  />
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    id="password"
                    placeholder="Enter address"
                    value={this.state.address}
                    onChange={this.onInputChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-success">Register</button>
                </p>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default CreateSponOrg;
