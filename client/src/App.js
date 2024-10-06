// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { ContextProvider } from './Context'; // Ensure the path is correct
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <ContextProvider>
      <div className="d-flex flex-column align-items-center">
        <nav className="navbar navbar-light bg-light mb-4" style={{ width: '100%', maxWidth: '600px', border: '2px solid black', borderRadius: '15px' }}>
          <h2 className="text-center">Video Chat</h2>
        </nav>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>
    </ContextProvider>
  );
};

export default App;
