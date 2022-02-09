import React from 'react'
import './App.css';

import { AuthProvider } from './Helpers/AuthProvider';
import { UserRoleProvider } from './Helpers/UserRoleProvider';
import RouteProvider from './Routes/index';


function App() {

  return (
      <AuthProvider>
        <UserRoleProvider>
          <RouteProvider/>
        </UserRoleProvider>
      </AuthProvider>
  );
}

export default App;
