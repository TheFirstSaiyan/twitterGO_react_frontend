import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import People from './components/People';
import SignIn from './components/SignIn';
import { useState } from 'react';
import Following from './components/Following';
import FriendTweets from './components/FriendTweets';


function App() {

  const [signedIn,setSignedIn] = useState(false)

  
  console.log(signedIn)
  return (
    <BrowserRouter>
    
    <div className="App">
    <div className='container'>
        <Navbar signedIn = {signedIn} setSignedIn = {setSignedIn}/>
      </div>
      <Routes>
    <Route exact path = "/" element={<SignIn signedIn = {signedIn} setSignedIn = {setSignedIn}/>} />
    <Route exact path="/people" element={<People setSignedIn = {setSignedIn}/>} />
    <Route exact path="/following" element={<Following setSignedIn = {setSignedIn}/>} />
    <Route exact path="/friend/tweets" element={<FriendTweets setSignedIn = {setSignedIn}/>} />


    </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
