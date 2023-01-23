import axios from "axios";
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router";
import Search from "./Search"
import User from "./User";



function People(props) {

    const [users, setUsers] = useState([]);
    const [buttonValues, setButtonValues] = useState([]);
    const navigation = useNavigate();

    async function checkFollowing(user, targetuser) {
        console.log(targetuser);
        try {
            let res = await axios.get("http://localhost:8000/api/user/followees/" + user + "/" + targetuser);
            if (res.status == 200) {
                console.log("helllo")
                return "follow"
            }
            else
            {
                return "unfollow";
            }

                
        }
        catch (error) {
            if(error.response.status == 302)
                return "unfollow"
            else
            {
                alert("something went wrong");
                navigation("/");
            }
        }
    }
    async function getAllUsers() {
        let url = "http://localhost:8000/api/user";

        try {
            let res = await axios.get(url);
            if (res.status == 200) {
                let data = await res.data;
                
                let buttonTexts = [];
                for(let i = 0;i< Object.keys(data).length;i++)
                {
                    
                    let buttonText = await checkFollowing(localStorage.getItem("user"),data[i].name);
                    buttonTexts.push(buttonText);
                }
                setUsers(data.map((user,i) => ({
                    userName: user.name,
                    buttonValue : buttonTexts[i]
                })));
                
                
            }
            else{
                alert("something went wrong")
                navigation("/");
            }
        }
        catch (error) {
            //alert("something went wrong");
        }
    }
    useEffect(() => {
        let user = localStorage.getItem("user")

        if (user) {
            props.setSignedIn(true)
            getAllUsers()
            console.log(users)
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
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => user.userName != localStorage.getItem('user') ? <User key={i} user={user} oldUsers ={users} setUsers = {setUsers}/> : <tr key={i}></tr>)}
                </tbody>
            </table>
            <div>

            </div>
        </div>)

}

export default People