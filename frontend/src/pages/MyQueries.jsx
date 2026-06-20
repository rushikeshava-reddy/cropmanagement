import { useEffect, useState } from "react";
import axios from "axios";

export default function MyEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMyEnquiries();
  }, []);

  const fetchMyEnquiries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/enquiries");

      console.log("Logged In User:", user);
      console.log("All Enquiries:", res.data);

      const myEnquiries = res.data.filter((item) => {
        return (
          item.email &&
          user &&
          item.email.toLowerCase().trim() ===
            user.email.toLowerCase().trim()
        );
      });

      console.log("My Enquiries:", myEnquiries);

      setEnquiries(myEnquiries);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-success text-center mb-4">
        🌱 My Enquiries
      </h2>

      {loading ? (
        <div className="text-center">
          <h5>Loading...</h5>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="alert alert-warning text-center">
          No enquiries found.
        </div>
      ) : (
        <table className="table table-bordered table-hover shadow">
          <thead className="table-success">
            <tr>
              <th>Category</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Admin Reply</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((item) => (
              <tr key={item._id}>
                <td>{item.category}</td>

                <td>{item.subject}</td>

                <td>{item.message}</td>

                <td>
                  {item.status === "Pending" ? (
                    <span className="badge bg-warning text-dark">
                      Pending
                    </span>
                  ) : (
                    <span className="badge bg-success">
                      Replied
                    </span>
                  )}
                </td>

                <td>
                  {item.reply ? (
                    <span className="text-success fw-bold">
                      {item.reply}
                    </span>
                  ) : (
                    <span className="text-secondary">
                      Waiting for admin response...
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}