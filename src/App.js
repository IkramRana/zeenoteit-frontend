import React, { useEffect, useState } from "react";
import AuthProvider from "hoc/authProvider";
import AppRoutes from 'routes';

function App() {
  const [platform, setPlatform] = useState('');
  console.log("🚀 ~ file: App.js:7 ~ App ~ platform:", platform)
  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/Windows/i)) {
      setPlatform('Windows');
    } else if (userAgent.match(/Macintosh/i)) {
      setPlatform('macOS');
    } else if (userAgent.match(/Linux/i)) {
      setPlatform('Linux');
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      setPlatform('iOS');
    } else if (userAgent.match(/Android/i)) {
      setPlatform('Android');
    } else {
      setPlatform('Unknown');
    }
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
