import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import "../components/AddSong.css"

function RehearsalList(props) {

    const { user } = useContext(AuthContext);

    const { theme } = useContext(ThemeContext);

    const storedToken = localStorage.getItem('authToken')

    const deleteRehearsal = (rehearsalId) => {

        axios.delete(`${process.env.REACT_APP_API_URL}/rehearsals/${rehearsalId}`, { headers: { Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                props.callbackRehearsals();
            })
            .catch(e => console.log("error deleting rehearsal...", e));
    }


    const renderRehearsals = (list) => {
        const result = list.map( (element) => {

            return (
                <div key={element._id} className="rehearsal-summary box">
                    <p>Name: {element.name}</p>
                    <p>Date: <u>{element.date.split("", 10)}</u></p>
                    <p>Time: {element.time}</p>
                    <p>Genre: {element.genre}</p>
                    <p>Skill Level: {element.skillLevel}</p>
                    <ul>Playlist: {element.song?.map((code, item) => {
                        return (
                                <li key={item}>
                                    {code.title}
                                </li>
                        )
                    })}</ul>
                    <button className={"button-52 " + theme}><a href="mailto:marija.strahinjic@hotmail.com">Contact musician</a></button>
                    <br />
                    { element.owner === user?._id &&
                    <>
                    <Link className="loginLink" to={`/rehearsals/${element._id}/edit`}>Edit</Link>
                    <Link className="loginLink" to="/rehearsals" onClick={() => {deleteRehearsal(element._id)}}>Finish session</Link>
                    </>
                    }
                </div>
            )
        });
        return result;
    }

    return (
        <div>
            <section className={"RehearsalList SongList " + theme}>
            <Link to="/rehearsals/create"><button className="button-52" type="submit">Create your rehearsal</button></Link>
            <h1>Choose your practice room:</h1> <br />
            { props.rehearsals === null ? <p>Loading...</p> : renderRehearsals(props.rehearsals) }
            </section>
        </div>
    )
}

export default RehearsalList;