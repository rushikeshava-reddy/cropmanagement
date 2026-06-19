import { useState } from "react";
import axios from "axios";
import './login.css'
import { Link } from 'react-router-dom';
export default function Register() {
   const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[confirmpass,confirmPassword]=useState("");
    const handleRegister = async (e) => {
        e.preventDefault();
         if (password !== confirmpass) {
        alert("Passwords do not match");
        return;
    }

        const userData = {
            fullName: fullName,
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/register",
                userData
            );

            alert(response.data.message);

            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch(error){
            alert(error.response.data.message);
        }
};

  return (
    <div className=" image">
      <div className="container">
      <div className="row">
        <div className="col-md-5 mt-5">
          
      <div className="box shadow p-3 mt-4  blur-card">
        <h1 style={{color:"green"}}>Create Account</h1>
        <p>Fill in the details to get started</p>
      <div className="box-card me-6">
      
        <form onSubmit={handleRegister} >

        <label style={{ fontSize: "20px" }}>Enter Name:</label>
        <br />
        <input
          type="text"
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="txt"
          className="form-control "
        required/>
        <br />

        <label style={{ fontSize: "20px" }}>Email:</label>
        <br />
        <input
         type="email"
          placeholder="Enter Email"
          value={email}
            onChange={(e) => setEmail(e.target.value)}
           className="form-control "
        required/>
        <br />

        <label style={{ fontSize: "20px" }}>Password:</label>
        <br />
        <input
        type="password"
              placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
          id="pass"
           className="form-control "
        required/>
        <br />

        <label style={{ fontSize: "20px" }}>Confirm Password:</label>
        <br />
        <input
         type="password"
                placeholder="Enter Password"
                value={confirmpass}
                onChange={(e) => confirmPassword(e.target.value)}
          className="form-control "
       required />
        <br />

        <div className="container mb-3">
          <input type="checkbox" required/> I agree to the{" "}
          <a href="#" style={{textDecoration:"none"}}>Terms of Service</a> and{" "}
          <a href="#" style={{textDecoration:"none"}}>Privacy Policy</a>
        </div>

        <button
         className="btn btn-success btn-md w-100 mb-3" 
        >
          Register
        </button>
        
          </form>
          </div>
        
          Already have an account? <Link to="/Login" style={{color:"red",textDecoration:"none"}}><strong>Login here</strong></Link>
        
      </div>
      </div>
    
      <div className="col-md-7">

      </div>
        </div>
     </div>
    </div>
  );
}

