import SideNav from "../components/SideNav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
export default function DashboardLayout(){
    return(
        <div className="box shadow ">
            <Header />
            <div style={{display:"flex"}}>
                <SideNav />
                <main style={{padding:"20px" ,flex:1}}>
                    <Outlet />
                </main>
            </div>
            <Footer/>
        </div>
    )
}