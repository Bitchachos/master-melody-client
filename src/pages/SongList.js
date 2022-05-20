import axios from "axios";
import { NavLink } from "react-router-dom";
import "./SongList.css"

function SongList(props){

    console.log(props.songs)
    const renderSongs = (list) => {
        const result = list.map( (element) => {
            
            return (
                <div key={element._id} className="song-summary box">
                    <p>Learn to play <u>{element.title}</u></p>
                    <p>by {element.artist}</p>
                    <NavLink to="/">More details</NavLink>
                    <NavLink to={`/songs/${element._id}/edit`}>Edit</NavLink>
                </div>
            )
        });
        return result;
    }

    return (
        <div className="SongList">
        <h1>Pick a song you'd like to learn:</h1>

        <section>
         { props.songs === null ? <p>Loading...</p> : renderSongs(props.songs) }
        </section>

        </div>
    )
}

export default SongList;