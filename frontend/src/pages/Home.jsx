import { Link } from "react-router-dom";
import './login.css';
export default function Home() {
  return (
    <div className="image">
    <div className="text-center">
      <div className="container">
        <div
          className="box shadow  m-auto p-5 blur-card"
          style={{ maxWidth: "650px" }}
        >
          <h1 className="mb-3">🌾 Crop managements System</h1>

          <p className="text-muted">
            Manage your crops, track growth, and view real-time weather updates
            for your farm location.
          </p>

          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">

            {/* Login */}
            <Link to="/Login" className="btn btn-success">
              Get Started
            </Link>

            {/* Public Enquiry */}
            <Link to="/enquireform" className="btn btn-warning text-dark">
              Ask a Query
            </Link>

            {/* Learn More */}
            <button
              className="btn btn-outline-primary"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              Learn More
            </button>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}