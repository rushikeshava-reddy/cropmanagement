import { Link,useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import Home from "./Home";
export default function Login() {
 
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  
  const navigate=useNavigate();
  
  const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
            const response = await axios.post(
              
                "http://localhost:5000/api/login",
                {
                    email,
                    password,
                }
            );
            localStorage.setItem("token",response.data.token)
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            alert(response.data.message);
            navigate("/dashboard");
          

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };
  return (
    <div className="image">
      <div className="container">
      

      <div className="row">
    
       <div className="col-md-4 mt-5"><div className="box-shadow p-3 mt-4 blur-card">
        <Link to="/Home" style={{textDecoration:"none" ,color:"black"}}>Back to Home</Link>
        <h1 style={{ color:"green",fontSize: "40px" }}>Welcome Back</h1>

        <p>Login to your account to continue</p>
        <form onSubmit={handleLogin} >
        <label style={{ fontSize: "20px" }}>Email</label>
        <br />
        <input
          type="email"
          id="Email"
          value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
          className="form-control"
       required />
        <br />

        <label style={{ fontSize: "20px" }}>Password</label>
        <br />
        <input
          type="password"
          id="pass"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
          className="form-control"
        required/>
        <br />
        <div className="container my-2">
        <div className="row ">
            <div className="col-md-7">
          <input type="checkbox" required/>
          <span>Remember me</span>
                </div>
                <div className="col-md-5">
          <Link to="/Forgotpassword" style={{textDecoration:"none"}}>
            Forgot password?
          </Link>
          </div>
        </div>
        </div>
        <button
         className="btn btn-success btn-sm w-100 " type="submit"
        >
          Login
        </button>
          </form>
        <div className="container mt-2 text-center">
          Don't have an account? <Link to="/Register" style={{color:"red",textDecoration:"none"}}><strong>Register here</strong></Link>
        </div>
        </div>
        </div>
        <div className="col-md-6">

        </div>
        </div>
      </div>
    </div>
  );
}