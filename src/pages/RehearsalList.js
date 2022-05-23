import { Link } from "react-router-dom";

function RehearsalList(props) {
console.log(props.rehearsals)
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
                            <>
                                <li key={item}>
                                    {code.title}
                                </li>
                            </>
                        )
                    })}</ul>
                    <Link to={`/rehearsals/${element._id}/edit`}>Edit</Link>
                    {/* <Link to="/songs" onClick={() => {deleteSong(element._id)}}>Delete</Link> */}
                </div>
            )
        });
        return result;
    }

    return (
        <div>
            <section className="RehearsalList SongList">
            <button>Create your rehearsal</button>
            <h1>Choose your practice room:</h1> <br />
            { props.rehearsals === null ? <p>Loading...</p> : renderRehearsals(props.rehearsals) }
            </section>

            
        </div>
    )
}

export default RehearsalList;