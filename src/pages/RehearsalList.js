import axios from "axios";
import { Link } from "react-router-dom";

function RehearsalList(props) {

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
                    <p>Choose a date that suits you: <u>{element.date}</u></p>
                    <p>What time works for you? {element.time}</p>
                    <p>Favourite genre? {element.genre}</p>
                    <p>What level are you at? {element.skillLevel}</p>
                    <ul>Choose your song: {element.song?.map((code, item) => {
                        return (
                                <li key={item}>
                                    {code.title}
                                </li>
                        )
                    })}</ul>
                    <Link className="loginLink" to={`/rehearsals/${element._id}/edit`}>Edit</Link>
                    <Link className="loginLink" to="/rehearsals" onClick={() => {deleteRehearsal(element._id)}}>Finish session</Link>
                </div>
            )
        });
        return result;
    }

    return (
        <div>
            <section className="RehearsalList SongList">
            <Link to="/rehearsals/create"><button className="button-52" type="submit">Create your rehearsal</button></Link>
            <h1>Choose your practice room:</h1> <br />
            { props.rehearsals === null ? <p>Loading...</p> : renderRehearsals(props.rehearsals) }
            </section>
        </div>
    )
}

export default RehearsalList;