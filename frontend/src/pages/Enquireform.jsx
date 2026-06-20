import { useState } from "react";
import axios from "axios";

export default function Enquireform() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/enquiries", formData);

      alert("Enquiry Submitted Successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        category: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-success text-white text-center py-3">
              <h2>🌱 Crop Management Enquiry</h2>
              <p className="mb-0">
                Need help? Send us your enquiry.
              </p>
            </div>

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option>Crop Information</option>
                    <option>Weather</option>
                    <option>Fertilizer</option>
                    <option>Pest Control</option>
                    <option>Irrigation</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="d-flex gap-3">
                  <button type="submit" className="btn btn-success px-4">
                    Submit Enquiry
                  </button>

                  <button
                    type="reset"
                    className="btn btn-outline-secondary px-4"
                    onClick={() =>
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        category: "",
                        subject: "",
                        message: "",
                      })
                    }
                  >
                    Reset
                  </button>
                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}