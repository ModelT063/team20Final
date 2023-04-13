import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/Navbar';
import { Grid } from '@aws-amplify/ui-react';

export default function Audit() {
  return (
        <>
          <div>
            <Navbar/>
          </div>
          <h1><center>Audit Reports</center></h1>
          <Grid></Grid>
        </>
  );
}