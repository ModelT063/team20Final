import Navbar from '../components/Navbar';

import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }: {signOut: any; user: any}) {
  return (
    <>
      <div>
        <Navbar/>
      </div>
      <h1>HOMEPAGE!!</h1>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);