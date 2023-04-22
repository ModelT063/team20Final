import Navbar from '../components/Navbar';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import {Avatar, Box, Typography, Button, Menu} from "@mui/material";
import { open } from 'fs';
import { fileURLToPath } from 'url';
// import auditPDF from "src\\CPSC 4910 Internal Audit Report.pdf";

function createData(reportNumber: number, user: string, reportType: string, reason:string, document:string) {
  return { reportNumber, user, reportType, reason, document};
}

const rows = [
  createData(1, 'Andy', 'Account Creation', 'User created a new account', ''),
  createData(2, 'Joel', 'Account Creation', 'User created a new account', ''),
  createData(3, 'Sydney', 'Points', 'Driver gained points', ''),
  createData(4, 'Jennifer', 'Points', 'Driver loss points', ''),
  createData(5, 'Zach', 'Account Deletion', 'Account was deleted by administrator', ''),
];

export default function Audit() {
  return (
        <>
          <div><Navbar/></div>
          <h1><center>Audit Reports</center></h1>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Report #</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Report Type</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">Documentation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.reportNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.reportNumber}
              </TableCell>
              <TableCell align="right">{row.user}</TableCell>
              <TableCell align="right">{row.reportType}</TableCell>
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right">
                  <Button color="inherit"endIcon={<FileOpenIcon/>} onClick={open_pdf}>{row.document} </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
  );

  function open_pdf() {
    // return (
    // <>
    //     <a href={"src\\CPSC 4910 Internal Audit Report.pdf"} target="_blank" 
    //     rel="noreferrer">
    //     Open First PDF
    // </a> <br></br>
    // </>
    // );
    window.open("src\\CPSC 4910 Internal Audit Report.pdf");
  };
 
}