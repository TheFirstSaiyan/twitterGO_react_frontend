import axios from "axios";
import { useEffect, useState } from "react";

import Tweet from "./Tweet";


function SignIn(props) {

    const [name, setName] = useState("")
    const [password, setPassWord] = useState("")
    const [tweets, setTweets] = useState([])
    const [tweet, setTweet] = useState("");

    async function addTweet() {
        let user = localStorage.getItem("user")
        try{
        let res = await axios.post("http://localhost:8000/api/tweet", { name: user, content: tweet });
        if (res.status != 200) {
            alert("couldnt add tweet! try again later");
        }
        else {
            getTweets(user);
            setTweet("");
        }}
        catch(error)
        {
            alert(error.response.status)
        }
    }
    async function signIn() {
        try {
            let res = await axios.post("http://localhost:8000/api/signin", { name: name, password: password })
            if (res.status == 200) {
                // store the user in localStorage
                localStorage.setItem('user', name)
                props.setSignedIn(true);
                getTweets(name)
            }
            else
                alert("something went wrong")




        }
        catch (error) {
            alert("UnAuthorized")
        }
    }

    async function signUp() {
        try {
            let res = await axios.post("http://localhost:8000/api/user", { name: name, password: password })
            if (res.status == 200) {
                // store the user in localStorage
                localStorage.setItem('user', name)
                props.setSignedIn(true);
                getTweets(name)
            }
            else
                alert("something went wrong")
        }
        catch (error) {
            alert("Bad Request")
        }

    }
    async function getTweets(user) {

        try {
            let res = await axios.get("http://localhost:8000/api/user/tweets/" + user)
            let data = await res.data
            if (res.status == 200) {
                props.setSignedIn(true);
                setTweets(data.map((tweet) => ({
                    content: tweet.content,
                    id: tweet.ID,
                    name: tweet.name,
                    createdAt: tweet.CreatedAt
                })));
            }
            else
                alert("something went wrong")


        }
        catch (error) {
            alert(error.response.status)
        }




    }

    useEffect(() => {
        let user = localStorage.getItem("user")
        if (user) {
            props.setSignedIn(true)
            getTweets(user);

        }
        else {
            props.setSignedIn(false)
        }


    }, []);




    return (<div className="container text-center mt-5 d-flex justify-content-center">
        {!props.signedIn && <div className="card col-5 shadow p-2">
            <div className="card-header">
                Sign In (or) Sign Up
            </div>
            <div className="text-start">
                <form className="form">
                    <label className="form-label">username</label>
                    <input class="form-control" value={name} onChange={(e) => (setName(e.target.value))}></input>
                    <label className="form-label mt-2">passcode</label>
                    <input type='password' class="form-control mt-2" value={password} onChange={(e) => (setPassWord(e.target.value))}></input>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-primary mt-4" onClick={signIn}>Sign in</button>
                        <button type="button" className="btn btn-info mt-4 ms-4" onClick={signUp}>Sign up</button>
                    </div>
                </form>
            </div>
        </div>}
        {props.signedIn && <div style={{ width: "80vw" }}>
            {tweets.length == 0 && <div>No Tweet from you yet!</div>}
            <div className="d-flex justify-content-around mt-2 align-items-center">
                <textarea type='text' className="shadow col-6" placeholder="tweet here...." rows={4} maxLength={100} value={tweet} onChange={(e) => (setTweet(e.target.value))}></textarea>
                <button className="btn btn-sm btn-success shadow" onClick={addTweet}>Tweet Now</button>
            </div>
            <div >{tweets.map((tweet, i) => (<Tweet key={i} tweet={tweet} getTweets={getTweets} />))}</div>
        </div>}


    </div>);
}

export default SignIn;