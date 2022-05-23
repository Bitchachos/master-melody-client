import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import "./SongList.css"

function SongList(props){

    console.log(props.songs)
    const renderSongs = (list) => {
        const result = list.map( (element) => {
            
            return (
                <div key={element._id} className="song-summary box">
                    <p>Learn to play <u>{element.title}</u></p>
                    <p>by {element.artist}</p>
                    <NavLink to={`/songs/${element._id}/edit`}>Edit</NavLink>
                    <NavLink to="/songs">Delete</NavLink>
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