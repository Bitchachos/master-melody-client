import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AddSong from "./components/AddSong";
import Homepage from "./pages/Homepage";
import SongList from "./pages/SongList";
import EditSong from "./components/EditSong";
import RehearsalList from "./pages/RehearsalList";
import AddRehearsal from "./components/AddRehearsal";
import EditRehearsal from "./components/EditRehearsal";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import IsProtected from "./components/IsProtected";
import { ThemeContext } from "./context/theme.context";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [songs, setSongs] = useState([]);
  const [rehearsals, setRehearsals] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    fetchRehearsals();
  }, []);

  const fetchSongs = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/songs`)
      .then((response) => {
        setSongs(response.data);
      })
      .catch((e) => console.log("error getting songs from API...", e));
  };

  const fetchRehearsals = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rehearsals`)
      .then((response) => {
        setRehearsals(response.data);
      })
      .catch((e) => console.log("error getting rehearsals from API...", e));
  };

  return (
    <div className={"App " + theme}>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark " : "☀️ Light "}
      </button>

      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/songs"
          element={<SongList songs={songs} callbackSongList={fetchSongs} />}
        />
        <Route
          path="/songs/create"
          element={
            <IsProtected>
              <AddSong songs={songs} callbackSongList={fetchSongs} />
            </IsProtected>
          }
        />
        <Route
          path="/songs/:songId/edit"
          element={
            <IsProtected>
              <EditSong songs={songs} callbackSongList={fetchSongs} />
            </IsProtected>
          }
        />
        <Route
          path="/rehearsals"
          element={
            <RehearsalList
              rehearsals={rehearsals}
              callbackRehearsals={fetchRehearsals}
            />
          }
        />
        <Route
          path="/rehearsals/create"
          element={
            <IsProtected>
              <AddRehearsal
                rehearsals={rehearsals}
                callbackRehearsalById={fetchRehearsals}
                songs={songs}
                callbackSongList={fetchSongs}
              />
            </IsProtected>
          }
        />
        <Route
          path="/rehearsals/:rehearsalId/edit"
          element={
            <IsProtected>
              <EditRehearsal
                rehearsals={rehearsals}
                callbackRehearsals={fetchRehearsals}
                songs={songs}
              />
            </IsProtected>
          }
        />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
