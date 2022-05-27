import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/AddSong.css";
import "./EditSong.css";

function EditSong(props) {

    const navigate = useNavigate();

    const {songId} = useParams();

    const storedToken = localStorage.getItem('authToken')

    const songDetails = props.songs?.find( song => song._id === songId);

    const [ title, setTitle ] = useState(songDetails?.title);
    const [ artist, setArtist ] = useState(songDetails?.artist);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSong = {
            title,
            artist
        }

        axios.put(`${process.env.REACT_APP_API_URL}/songs/${songId}`, newSong, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => {
            props.callbackSongList();
            navigate("/songs");
        })
        .catch(e => console.log("error updating song", e))
    }


    return (
        <section className="EditSong">
            <h1>Edit the song:</h1>

            <form className="forms" onSubmit={handleSubmit}>
                <label>
                    Title: &nbsp;&nbsp;
                    <input
                        type="text"
                        name="title"
                        value={title}
                        required={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Artist: &nbsp;&nbsp;
                    <input
                        type="text"
                        name="artist"
                        value={artist}
                        required={true}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </label>

                <br />
                <button className="button-52" type="submit">Update</button>

            </form>

        </section>
    )
}

export default EditSong;