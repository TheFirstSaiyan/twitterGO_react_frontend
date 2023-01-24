import axios from "axios";
import { Navigate } from "react-router";

function Tweet(props) {

    async function deleteTweet(id) {
        
            let res = await axios.delete("http://localhost:8000/api/tweet/" + id);
            if (res.status == 200) {
                alert("deleted Tweet");
                let user = localStorage.getItem("user")

                props.getTweets(user);
            }
            else
            {
                alert("something went wrong");
            }
        // }
        // catch (error) {
        //     alert("something went wrong");
        // }

    }
    return (
        <div className="d-flex flex-column shadow mt-2 mb-2 p-2 border text-start rounded-3 border-dark" style={{ width: "100%", height: "fit-content" }}>
            <div className="text-start">
                {props.tweet.content}
            </div>
            <div className="text-success text-sm-end">{props.tweet.createdAt}</div>
            <div className="d-flex justify-content-end">
                <button className="btn-sm btn btn-warning" onClick={() => { deleteTweet(props.tweet.id) }}>
                    delete
                </button>
            </div>
        </div>
    );
}

export default Tweet;