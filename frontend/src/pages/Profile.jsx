export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
      const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/Login");
    }
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">

            {/* Header */}
            <div className="card-header bg-success text-white text-center py-4 rounded-top-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="rounded-circle border border-3 border-white"
                width="100"
                height="100"
              />
              <h3 className="mt-3 mb-0">
                {user?.fullName || "Farmer"}
              </h3>
              <small>Crop Management User</small>
            </div>

            {/* Body */}
            <div className="card-body p-4">

              <div className="mb-3">
                <label className="fw-bold text-success">
                  <i className="bi bi-person-fill me-2"></i>Full Name
                </label>
                <div className="form-control bg-light">
                  {user?.fullName}
                </div>
              </div>

              <div className="mb-3">
                <label className="fw-bold text-success">
                  <i className="bi bi-envelope-fill me-2"></i>Email
                </label>
                <div className="form-control bg-light">
                  {user?.email}
                </div>
              </div>

              <div className="mb-3">
                <label className="fw-bold text-success">
                  <i className="bi bi-shield-check me-2"></i>Role
                </label>
                <div className="form-control bg-light">
                  Farmer
                </div>
              </div>

              <div className="d-grid gap-2 mt-4">
                

                <button onClick={handleLogout} className="btn btn-outline-danger" >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}