import { Link, useNavigate } from "react-router-dom";

export default function SideNav() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/Login");
    };

    return (
        <div
            style={{
                width: "220px",
                backgroundColor: "#212529",
                minHeight: "80vh",
                padding: "30px",
            }}
        >

            <Link
                to="/dashboard"
                style={{ color: "white", display: "block", marginBottom: "15px" }}
            >
                Dashboard
            </Link>

            <Link
                to="/dashboard/crops"
                style={{ color: "white", display: "block", marginBottom: "15px" }}
            >
                Crops
            </Link>

            <Link
                to="/dashboard/weather"
                style={{ color: "white", display: "block", marginBottom: "15px" }}
            >
                Weather
            </Link>

            {/* User Menu */}
            {user?.role === "user" && (
                <>
                
                    <Link
                        to="/dashboard/enquireform"
                        style={{ color: "white", display: "block", marginBottom: "15px" }}
                    >
                        Enquiry
                    </Link>

                    <Link
                        to="/dashboard/myqueries"
                        style={{ color: "white", display: "block", marginBottom: "15px" }}
                    >
                        My Queries
                    </Link>
                </>
            )}

            {/* Admin Menu */}
            {user?.role === "admin" && (
                <Link
                    to="/dashboard/AdminQueries"
                    style={{ color: "white", display: "block", marginBottom: "15px" }}
                >
                    Admin Queries
                </Link>
            )}

            <Link
                to="/dashboard/profile"
                style={{ color: "white", display: "block", marginBottom: "15px" }}
            >
                Profile
            </Link>

            <button
                onClick={handleLogout}
                className="btn btn-danger mt-3"
            >
                Logout
            </button>

        </div>
    );
}