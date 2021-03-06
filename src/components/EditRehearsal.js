import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../components/AddSong.css";
import "./EditSong.css";

function EditRehearsal(props) {

  const navigate = useNavigate();

    const storedToken = localStorage.getItem('authToken')

    const {rehearsalId} = useParams();

    const rehearsalDetails = props.rehearsals?.find( rehearsal => rehearsal._id === rehearsalId);

    const [ date, setDate ] = useState(rehearsalDetails?.date);
    const [ time, setTime ] = useState(rehearsalDetails?.time);
    const [ genre, setGenre ] = useState(rehearsalDetails?.genre);
    const [ skillLevel, setSkillLevel ] = useState(rehearsalDetails?.skillLevel);
    const [ song, setSong ] = useState(rehearsalDetails?.song);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRehearsal = {
            date,
            time,
            genre,
            skillLevel,
            song: song.name
        }

        axios.put(`${process.env.REACT_APP_API_URL}/rehearsals/${rehearsalId}`, newRehearsal, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => {
            props.callbackRehearsals();
            navigate("/rehearsals");
        })
        .catch(e => console.log("error updating rehearsal", e))
    }

    const handleChange = (e) => {
      
      let value = Array.from(e.target.selectedOptions, option => option.value);
      setSong({name: value});
    }

    return (
        <section className="EditSong">
            <h1>Edit your rehearsal:</h1>

            <form className="forms" onSubmit={handleSubmit}>
          <label>
            Date:&nbsp;&nbsp;
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            Time:&nbsp;&nbsp;
            <input
              type="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <br />

          <label>
            Genre:&nbsp;&nbsp;
            <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
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
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            Skill Level:&nbsp;&nbsp;
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
    )
}

export default EditRehearsal;