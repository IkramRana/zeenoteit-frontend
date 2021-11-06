import React from "react";
import AuthProvider from "hoc/authProvider";
import AppRoutes from 'routes';

function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
