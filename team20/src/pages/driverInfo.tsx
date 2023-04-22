import Navbar from "../components/Navbar";
import { Auth } from "aws-amplify";
import React, { Component, useState, useEffect } from "react";
import { UserType } from "@/types/user";
import NotFoundPage from "@/components/404";
import { CircularProgress } from "@mui/material";
                                                                                                                                  
class DriverInfo extends Component {
    
    // read driver info
    fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
    // display the retrieved data in the HTML
    const resultDiv = document.getElementById('result');
    const dataString = JSON.stringify(data);
    resultDiv.innerHTML = `<pre>${dataString}</pre>`;
    })
    .catch(error => console.error(error));

    // add points function

    // remove points function

    // return:
        // driver info
        // add points
        // remove points

}