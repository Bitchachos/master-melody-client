import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AddSong from './components/AddSong';
import Homepage from './pages/Homepage';
import SongList from './pages/SongList';


function App() {

  const [songs, setSongs] = useState([])

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/songs`)
      .then((response) => {
        setSongs(response.data)
      })
      .catch(e => console.log("error getting songs from API...", e))
  }

  return (
    <div className="App">
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/songs" element={<SongList songs={songs} callbackSongList={fetchSongs}/>} />
        <Route path="/songs/create" element={<AddSong songs={songs} callbackSongList={fetchSongs}/>} />
      </Routes>
    </div>
  );
}

export default App;
