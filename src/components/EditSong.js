import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditSong(props) {

    const navigate = useNavigate();

    const {songId} = useParams();

    const songDetails = props.songs?.find( song => song._id === songId);

    const [ title, setTitle ] = useState(songDetails?.title);
    const [ artist, setArtist ] = useState(songDetails?.artist);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSong = {
            title,
            artist
        }

        axios.put(`${process.env.REACT_APP_API_URL}/songs/${songId}`, newSong)
        .then(response => {
            props.callbackSongList();
            navigate("/songs");
        })
        .catch(e => console.log("error updating song", e))
    }


    return (
        <section className="EditSong">
            <h1>Edit the song:</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Title
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
                    Artist
                    <input
                        type="text"
                        name="artist"
                        value={artist}
                        required={true}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </label>

                <br />
                <button type="submit">Update</button>

            </form>

        </section>
    )
}

export default EditSong;