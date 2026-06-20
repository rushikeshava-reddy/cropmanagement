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
import Enquireform from "./pages/Enquireform"
import AdminEnquiries from "./pages/AdminQueries"
import MyQueries from "./pages/MyQueries"
import Home from "./pages/Home";
export default function App(){
  return(
    <div>
      <BrowserRouter>
  <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Home" element={<Home/>}/>
    <Route path="/Register" element={<Register />} />
    <Route path="/enquireform" element={<Enquireform/>}/>
    <Route
      path="/dashboard"
      element={
        <Protected allowedRoles={["admin", "user"]}>
          <DashboardLayout />
        </Protected>
      }
   >
      <Route index element={<Dashboard />} />

      <Route path="profile" element={<Profile />} />
      <Route path="crops" element={<Crops />} />
      <Route path="weather" element={<Weather />} />
      <Route path="enquireform" element={<Enquireform />} />

      {/* 🔴 ADMIN ONLY */}
      <Route
        path="AdminQueries"
        element={
          <Protected allowedRoles={["admin"]}>
            <AdminEnquiries />
          </Protected>
        }
      />

      {/* 🟢 USER ONLY */}
      <Route
        path="myqueries"
        element={
          <Protected allowedRoles={["user", "admin"]}>
            <MyQueries />
          </Protected>
        }
      />
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