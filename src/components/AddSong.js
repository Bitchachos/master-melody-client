import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./AddSong.css";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddSong(props){

    const [ title, setTitle ] = useState("")
    const [ artist, setArtist ] = useState("")

    const storedToken = localStorage.getItem('authToken')

    // const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSong = {
            title,
            artist
        }

        axios.post(process.env.REACT_APP_API_URL + "/songs", newSong, { headers: { Authorization: `Bearer ${storedToken}`}})
            .then(response => {
                console.log(response.data)

                props.callbackSongList();

                // navigate("/songs"); 

                setTitle("");
                setArtist("");
            })
            .catch(e => console.log("error creating song", e));

    }

    const notify = () => toast.success('🎵 Song added successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    return (
        <section className="AddSong">
            <h1>Add a new song</h1>

            <form className="forms" onSubmit={handleSubmit}>
                <label>
                    Title
                   <input
                        type="text"
                        name="title"
                        value={title}
                        required={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Artist
                    <input
                        type="text"
                        name="artist"
                        value={artist}
                        required={true}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </label>

                <br />
                <button className="button-52" type="submit" onClick={notify}>Create song</button>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </form>

        </section>
    )
}

export default AddSong;