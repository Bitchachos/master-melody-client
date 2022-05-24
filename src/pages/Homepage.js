import "./Homepage.css"

function Homepage(props){
    return (
        <>
        <h1>Welcome to Master Melody, {props.user}!</h1>
        <h2 className="actually-learn">... where you <i>actually</i> learn how to play music!</h2>
        </>
    )
}

export default Homepage;