import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../../aws-exports-fixed";
Amplify.configure(awsExports);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

