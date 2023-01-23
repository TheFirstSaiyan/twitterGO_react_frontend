import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import FriendTweet from "./FriendTweet";

function FriendTweets(props) {

    const location = useLocation();
    const navigation = useNavigate();
    const [tweetsByFriend,setTweetsByFriend] = useState([])
    console.log("hello")
    useEffect(() => {
        let user = localStorage.getItem("user")

        if (user) {
            props.setSignedIn(true)
            setTweetsByFriend(location.state)
        }
        else {
            navigation("/");
        }


    }, [navigation,location]);
    return ( 
        <div className="container mt-4 d-flex justify-content-center">
        {tweetsByFriend.length > 0 && <div style = {{width : "80vw"}}>{tweetsByFriend.map((tweet,i)=>(<FriendTweet key = {i} tweet = {tweet}/>))}</div>}
        {tweetsByFriend.length == 0 && <div>No tweets from this user yet!</div>}
    </div>);
}

export default FriendTweets;