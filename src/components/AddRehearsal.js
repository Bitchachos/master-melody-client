import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/AddSong.css"

function AddRehearsal(props) {

    const [ date, setDate ] = useState("")
    const [ time, setTime ] = useState("")
    const [ genre, setGenre ] = useState("Pop")
    const [ skillLevel, setSkillLevel ] = useState("")
    const [ song, setSong ] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
      console.log('clicked submit button')
        e.preventDefault();

        const newRehearsal = {
            date,
            time,
            genre,
            skillLevel,
            song: song.values // it should be an array in setState
        }

        console.log(newRehearsal)

console.log(typeof newRehearsal.time);
        axios.post(process.env.REACT_APP_API_URL + "/rehearsals", newRehearsal)
            .then(response => {
                console.log(response.data)

                props.callbackRehearsalById();

                navigate("/rehearsals");

                setDate("");
                setTime("");
                setGenre("");
                setSkillLevel("");
                setSong("");
            })
            .catch(e => console.log("error creating rehearsal", e));
            

    }

    const handleChange = (e) => {
      let value = Array.from(e.target.selectedOptions, option => option.value);
      setSong({values: value});
      console.log("thi is consologitoooo")
      console.log("------->>", song)

    }

    return (
      <section className="AddRehearsal">
        <h1>Add a new rehearsal</h1>

        <form className="forms" onSubmit={handleSubmit}>
          <label>
            Date:&nbsp;&nbsp;
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
            Time:&nbsp;&nbsp;
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
            Genre:&nbsp;&nbsp;
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

          <label
            required={true}
            value={props.skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            Skill Level:<br />
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
            Songs:&nbsp;&nbsp;
            <select multiple={true} name="song" value={props.song} onChange={(e) => handleChange(e)}>
             {props.songs?.map((code, items) => {
              return (
                  <option key={items} value={code._id}>{code.title}</option>
              )})}
            </select>&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/songs/create">Or create your own song!</Link>
          </label>

          <br />
          <br />
          <button className="button-52" type="submit">Start rehearsing now!</button>
        </form>
      </section>
    );
}

export default AddRehearsal;