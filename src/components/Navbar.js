import { Link, Navigate } from "react-router-dom"


function Navbar(props)
{

  function signOut()
  {
    localStorage.clear();
    props.setSignedIn(false);
    Navigate("/");

  }
    return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand fw-bold" to="/">Tweeter</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      
      {props.signedIn && <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">My Tweets</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/people">People</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to = "/following">Following</Link>
          </li>
         
          <li className="nav-item">
            <Link className="nav-link" onClick={signOut}>Sign out</Link>
          </li>
        </ul>}
      </div>
    </div>
  </nav>)
}

export default Navbar