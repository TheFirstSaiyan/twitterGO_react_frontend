import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Friend(props) {
    let navigation = useNavigate()
    const [tweetsByFriend,setTweetsByFriend] = useState([])
    async function getTweetsByUser(name)
    {
        try {
        let res = await axios.get("http://localhost:8000/api/user/tweets/"+name);
        let data = await res.data

        if(Object.keys(data).length == 0)
        {
            navigation("/friend/tweets",{state:[]})
        }
        setTweetsByFriend(data.map((tweet, i) => ({
            content: tweet.content,
            createdAt : tweet.CreatedAt
        })));

    }
    catch (error) {
        alert(error);
       
    }
    }

    useEffect(()=>{
        if(tweetsByFriend.length > 0)
            navigation("/friend/tweets",{state : tweetsByFriend})


    },[navigation,tweetsByFriend])
    return (<tr>
        <td>{props.user.name}</td>
        <td><button className='btn btn-sm btn-primary' onClick = {()=>getTweetsByUser(props.user.name)}>see tweets</button></td>
    </tr> );
}

export default Friend;