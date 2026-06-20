export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header
      className="text-white py-4 shadow"
      style={{
        background: "linear-gradient(90deg,#198754,#2E8B57,#4CAF50)",
      }}
    >
      <div className="container">

        <div className="row align-items-center">

          {/* Left Side */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-1">
              🌱 Crop Management Portal
            </h2>

            <p className="mb-0">
              Welcome back,
              <span className="fw-bold">
                {" "}
                {user?.fullName || "Farmer"} 👋
              </span>
            </p>

            <small>
              Manage your crops efficiently and increase productivity.
            </small>
          </div>

          {/* Right Side */}
          <div className="col-md-6">

            <div className="d-flex justify-content-md-end align-items-center gap-3 mt-3 mt-md-0">

              {/* Search */}
              <div className="input-group" style={{ maxWidth: "280px" }}>
                <span className="input-group-text bg-white border-0">
                  🔍
                </span>

                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search crops..."
                />
              </div>

              {/* Profile */}
              <div className="text-center">
                <div
                  className="bg-white text-success rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "22px",
                  }}
                >
                  👤
                </div>
              </div>

            </div>

            <div className="text-md-end mt-2">
              <small>
                📅 {new Date().toLocaleDateString()}
              </small>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}