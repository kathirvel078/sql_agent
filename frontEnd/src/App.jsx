import React from 'react';
import ChatPage from './pages/ChatPage';
import './index.css';

function App() {
  return (
    <div className="dark">
      {/* 
        We are forcing dark mode by adding the 'dark' class. 
        You can remove this class or implement a theme toggle 
        if you want light mode support.
      */}
      <ChatPage />
    </div>
  );
}

export default App;
