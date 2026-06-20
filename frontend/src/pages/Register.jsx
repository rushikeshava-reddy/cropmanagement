import { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmpass) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      fullName,
      email,
      password,
      role,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );

      alert(response.data.message);

      setFullName("");
      setEmail("");
      setRole("user");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="image">
      <div className="container">
        <div className="row">

          <div className="col-md-5 mt-5">

            <div className="box shadow p-3 mt-4 blur-card">

              <h1 style={{ color: "green" }}>Create Account</h1>
              <p>Fill in the details to get started</p>

              <form onSubmit={handleRegister}>

                <label style={{ fontSize: "20px" }}>
                  Enter Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <br />

                <label style={{ fontSize: "20px" }}>
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <br />

                <label style={{ fontSize: "20px" }}>
                  Select Role:
                </label>

                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <br />

                <label style={{ fontSize: "20px" }}>
                  Password:
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <br />

                <label style={{ fontSize: "20px" }}>
                  Confirm Password:
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmpass}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <br />

                <div className="mb-3">
                  <input type="checkbox" required /> I agree to the{" "}
                  <a href="#" style={{ textDecoration: "none" }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" style={{ textDecoration: "none" }}>
                    Privacy Policy
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mb-3"
                >
                  Register
                </button>

              </form>

              <p>
                Already have an account?{" "}
                <Link
                  to="/Login"
                  style={{
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  <strong>Login here</strong>
                </Link>
              </p>

            </div>

          </div>

          <div className="col-md-7"></div>

        </div>
      </div>
    </div>
  );
}