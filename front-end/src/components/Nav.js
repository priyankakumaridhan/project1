import React from 'react';
import {Link} from 'react-router-dom';
const Nav=()=>{
    return(
        <div>
            <ul className="nav-ul">
            <li><Link to="/home">Home Page</Link></li>
            <li><Link to="/about">About </Link></li>
            <li><Link to="/product">Product </Link></li>
            <li><Link to="/signup">Sign Up </Link></li>
            </ul>
        </div>
    )
}
export default Nav;