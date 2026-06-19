import { BrowserRouter, Route, Routes ,Navigate} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import './App.css'
import Dashboard from "./pages/Dashboard"
import DashboardLayout from "./Layout/DashboardLayout"
import Profile from "./pages/Profile"
import Protected from "./components/Protected"
import Crops from "./pages/Crops"
import Weather from "./pages/Weather"
export default function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />}/>
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" 
        element={
          <Protected>
            <DashboardLayout />
          </Protected>
        }>
          <Route index element={<Dashboard />} />
       
          <Route path="profile" element={<Profile/>}/>
          <Route path="crops" element={<Crops />}/>
          <Route path="weather" element={<Weather/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
function App1(){
  return(
    <div >
      <Dashboard />
    </div>
  )
}