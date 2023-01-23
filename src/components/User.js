import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";


function User(props) {
    let navigation = useNavigate()
    let [buttonValue, setButtonValue] = useState("")


    async function changeFollowing(name, type) {
        try {
            if (type == "follow") {
                let res = await axios.post("http://localhost:8000/api/follow", { sourceuser: localStorage.getItem('user'), targetuser: name })
                if (res.status == 200) {
                    alert("following");
                    setButtonValue("unfollow")

                }
                else
                    alert("something went wrong");
                    
            }
            else if (type == "unfollow") {
                let res = await axios.delete("http://localhost:8000/api/user/followees/" + localStorage.getItem('user') + "/" + name);
                if (res.status == 200) {
                    alert("unfollowed");
                    setButtonValue("follow");
                }
                else
                    alert("something went wrong");

            }
        }
        catch (error) {
            alert("something went wrong");
        }
    }

    useEffect(()=>{setButtonValue(props.user.buttonValue)},[])
    return (<tr>
        <td>{props.user.userName}</td>
        <td><button className='btn btn-sm btn-primary' onClick={() => (changeFollowing(props.user.userName, buttonValue))}>{buttonValue}</button></td>
    </tr>);
}

export default User;