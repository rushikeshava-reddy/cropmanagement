import { Link, Navigate, useNavigate } from "react-router-dom";

export default function SideNav(){
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/Login");
    }
    return(
        <div style={{width:"220px",backgroundColor:"#212529",minHeight:"80vh",padding:"30px"}}>
            <Link to="/dashboard" style={{color:"white",display:"block",marginBottom:"15px"}}>
            Dashboard</Link>
             <Link to="/dashboard/crops" style={{color:"white",display:"block",marginBottom:"15px"}}>
            Crops</Link>
            <Link to="/dashboard/weather" style={{color:"white",display:"block",marginBottom:"15px"}}>Weather</Link>
            <Link to="/dashboard/profile" style={{color:"white",display:"block",marginBottom:"15px"}}>
            Profile</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}