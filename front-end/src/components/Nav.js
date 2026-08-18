import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img alt="logo" className="logo" src="https://t4.ftcdn.net/jpg/02/86/20/27/360_F_286202792_yLD4HEmCF2YpIgevD2sNnOQ8PambyfZn.jpg"/>
            {auth ? <ul className="nav-ul">
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/about">About </Link></li>
                <li><Link to="/product">Products </Link></li>
                <li><Link to="/add-product">AddProduct </Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Sign Up </Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}
export default Nav;