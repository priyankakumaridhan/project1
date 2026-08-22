import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth= localStorage.getItem('user');
        if(auth){
            navigate('/product')
        }
    })
    const handleLogin=async ()=>{
        console.warn(email,password)
        let result= await fetch('http://localhost:5000/login',{
        method : 'post',
        body : JSON.stringify({email,password}),
        headers: {
            'Content-Type': 'application/json'
        },
        });
        result=await result.json();
        console.warn(result)
        if(result.auth){
                localStorage.setItem("user",JSON.stringify(result.user));
                localStorage.setItem("token",JSON.stringify(result.auth));
                navigate('/product')
            }else{
            alert("please enter correct details")
        }

    }
    return(
     <div className="auth">
        <h1 className="page-title">Log in</h1>
        <p className="page-subtitle">Welcome back. Enter your details to continue.</p>

        <div className="card card__pad" style={{ marginTop: 'var(--sp-4)' }}>
            <div className="field">
                <label className="field__label" htmlFor="login-email">Email</label>
                <input
                    id="login-email"
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="field">
                <label className="field__label" htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className="form-actions">
                <button onClick={handleLogin} className="btn btn--primary" type="button">Log in</button>
            </div>
        </div>
     </div>
    )
}
export default Login;
