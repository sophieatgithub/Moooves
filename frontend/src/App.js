import React from 'react'; 
import './App.css';
import ReturnedGifs from './components/gif_box/returned_gifs';
import AppBar from './components/app_bar/app_bar';

function App() {
  return (
    <div>
      <AppBar />
      <ReturnedGifs />
    </div>
  );
}

export default App;