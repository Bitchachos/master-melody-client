import "./Homepage.css";
import video from "../videos/master-melody.mp4";
import ReactPlayer from 'react-player'

function Homepage(props){

    return (
        <div className={"Homepage"}>
        <ReactPlayer className="video" playing url={ video } autoPlay={true} muted loop/>
        <h1>Welcome to Master Melody!</h1>
        <h2 className="actually-learn">... where you <i>actually</i> &nbsp;learn how to play music!</h2>
        </div>
    )
}

export default Homepage;