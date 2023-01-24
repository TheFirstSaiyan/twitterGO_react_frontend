import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Friend from "./Friend";

function Following(props) {
    const navigation = useNavigate();
    const [friends, setFriends] = useState([]);

    async function getAllFollowees() {

        try {
            let res = await axios.get("http://localhost:8000/api/user/followees/" + localStorage.getItem("user"));
            let data = await res.data;
            setFriends(data.map((user, i) => ({
                name: user.targetuser,
            })));
        }
        catch (error) {
            alert("something went wrong");
            navigation("/")
        }

    }
    useEffect(() => {
        let user = localStorage.getItem("user")

        if (user) {
            props.setSignedIn(true)
            getAllFollowees()
        }
        else {
            navigation("/");
        }


    }, [navigation]);
    return (
        <div className="text-center m-5">
            {/* <Search/> */}
            <table className="container table table-fixed border table-hover">
                <thead>
                    <tr>
                        <th>followee username</th>
                        <th>action</th>

                    </tr>
                </thead>
                <tbody>
                    {friends.map((user, i) => <Friend key={i} user={user} setSignedIn = {props.setSignedIn} />)}
                </tbody>
            </table>
            <div>

            </div>
        </div>
    );
}

export default Following;