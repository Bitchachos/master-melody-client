import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRehearsal(props) {

    const [ date, setDate ] = useState("")
    const [ time, setTime ] = useState("")
    const [ genre, setGenre ] = useState("")
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
            song // it should be an array in setState
        }
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

    return (
      <section className="AddRehearsal">
        <h1>Add a new rehearsal</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={props.date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={props.time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <br />

          <label>
            Genre:
            <select name="genre" value={props.genre} onChange={(e) => setGenre(e.target.value)}>
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
            Skill Level:
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
            Songs:
            <select name="song" value={song} onChange={(e) => setSong(e.target.value)}multiple>
             {props.songs?.map((code, items) => {
              return (
                  <option key={items} value={code._id}>{code.title}</option>
              )})}
            </select>
          </label>

          <br />
          <br />
          <button className="button-52" type="submit">Start rehearsing now!</button>
        </form>
      </section>
    );
}

export default AddRehearsal;