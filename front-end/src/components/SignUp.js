import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
const SignUp=()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate();

    useEffect(()=>{
        const auth= localStorage.getItem('user');
        if(auth)
        {
          navigate('/product')
        }
    })

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register',{
            method: 'post',
            body: JSON.stringify({name,email,password}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json()
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if (result){
            navigate('/product')

        }
    } 
    return(
        <div className="auth">
            <h1 className="page-title">Create account</h1>
            <p className="page-subtitle">Set up your dashboard in a few seconds.</p>

            <div className="card card__pad" style={{ marginTop: 'var(--sp-4)' }}>
                <div className="field">
                    <label className="field__label" htmlFor="signup-name">Name</label>
                    <input
                        id="signup-name"
                        className="input"
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="field__label" htmlFor="signup-email">Email</label>
                    <input
                        id="signup-email"
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="field__label" htmlFor="signup-password">Password</label>
                    <input
                        id="signup-password"
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="form-actions">
                    <button onClick={collectData} className="btn btn--primary" type="button">Sign Up</button>
                </div>
            </div>
        </div>
    )
}
export default SignUp;