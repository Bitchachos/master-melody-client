import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/AddSong.css"

function AddRehearsal(props) {

    const [ name, setName ] = useState("")
    const [ date, setDate ] = useState("")
    const [ time, setTime ] = useState("")
    const [ genre, setGenre ] = useState("Pop")
    const [ skillLevel, setSkillLevel ] = useState("")
    const [ song, setSong ] = useState("")

    const navigate = useNavigate();

    const storedToken = localStorage.getItem('authToken')

    const handleSubmit = (e) => {
      console.log('clicked submit button')
        e.preventDefault();

        const newRehearsal = {
            name,
            date,
            time,
            genre,
            skillLevel,
            song: song.name // it should be an array in setState
        }

        console.log(newRehearsal)

console.log(typeof newRehearsal.time);
        axios.post(process.env.REACT_APP_API_URL + "/rehearsals", newRehearsal, { headers: { Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                console.log(response.data)

                props.callbackRehearsalById();

                navigate("/rehearsals");

                setName("");
                setDate("");
                setTime("");
                setGenre("");
                setSkillLevel("");
                setSong("");
            })
            .catch(e => console.log("error creating rehearsal", e));
    }

    const handleChange = (e) => {
      //let name = e.target.name
     // let value = Array.from(e.target.selectedOptions, option => option.value);
      //setSong({[name]: value});


      let value = Array.from(e.target.selectedOptions, option => option.value);
      setSong({name: value});
    }

    return (
      <section className="AddRehearsal">
        <h1>Add a new rehearsal</h1>

        <form className="forms" onSubmit={handleSubmit}>
          <label>
          Name your rehearsal:&nbsp;&nbsp;
            <input
              type="text"
              name="name"
              value={props.name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
          Choose a date that suits you:&nbsp;&nbsp;
            <input
              type="date"
              name="date"
              value={props.date}
              required={true}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <br />
          <label>
          What time works for you?&nbsp;&nbsp;
            <input
              type="time"
              name="time"
              value={props.time}
              required={true}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <br />

          <label>
          Favourite genre?&nbsp;&nbsp;
            <select name="genre" required={true} value={props.genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Indie">Indie</option>
              <option value="Jazz">Jazz</option>
              <option value="Metal">Metal</option>
              <option value="Country">Country</option>
            </select>
          </label>

          <br />

          <label className="radio-label"
            required={true}
            value={props.skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            What level are you at?&nbsp;&nbsp;
            <input
              className="radio-buttons"
              type="radio"
              name="skillLevel"
              value="Beginner"
            />
            <label>Beginner</label>
            <input
              className="radio-buttons"
              type="radio"
              name="skillLevel"
              value="Intermediate"
            />
            <label>Intermediate</label>
            <input
              className="radio-buttons"
              type="radio"
              name="skillLevel"
              value="Advanced"
            />
            <label>Advanced</label>
          </label>

          <br />

          <label>
          Choose the songs you want to play:&nbsp;&nbsp;
            <select multiple={true} name="song" value={props.song} onChange={(e) => handleChange(e)}>
             {props.songs?.map((item, code) => {
              return (
                  <option key={code} value={item._id}>{item.title}</option>
              )})}
            </select>&nbsp;&nbsp;&nbsp;&nbsp;<Link className="loginLink" to="/songs/create">Or create your own song!</Link>
          </label>

          <br />
          <br />
          <button className="button-52" type="submit">Start rehearsing now!</button>
        </form>
      </section>
    );
}

export default AddRehearsal;