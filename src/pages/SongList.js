import axios from "axios";
import { Link } from "react-router-dom";
import "./SongList.css"

function SongList(props){

    const deleteSong = (songId) => {

        axios.delete(`${process.env.REACT_APP_API_URL}/songs/${songId}`)
            .then(response => {
                props.callbackSongList();
            })
            .catch(e => console.log("error deleting song...", e));
    }

    const renderSongs = (list) => {
        const result = list.map( (element) => {
            
            return (
                <div key={element._id} className="song-summary box">
                    <p>Learn to play <u>{element.title}</u></p>
                    <p>by {element.artist}</p>
                    <Link to={`/songs/${element._id}/edit`}>Edit</Link>
                    <Link to="/songs" onClick={() => {deleteSong(element._id)}}>Delete</Link>
                </div>
            )
        });
        return result;
    }

    return (
        <div>

        <section className="SongList split left">
            <h1>Pick a song you'd like to learn:</h1> <br />
            { props.songs === null ? <p>Loading...</p> : renderSongs(props.songs) }
        </section>

        <section className="SongList split right">
            <h1>... or add a song you'd like to play</h1>
            <Link to="/songs/create"><button>Add Song</button></Link>

        </section>

        </div>
    )
}

export default SongList;