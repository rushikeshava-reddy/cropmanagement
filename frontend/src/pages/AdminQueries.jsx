import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminQueries() {
  const [enquiries, setEnquiries] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getEnquiries();
  }, []);

  const getEnquiries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/enquiries");
      setEnquiries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitReply = async (id) => {
    try {
      await axios.put(`http://localhost:5000/enquiries/${id}/reply`, {
        reply,
      });

      alert("Reply submitted successfully");

      setReply("");
      setSelectedId(null);

      getEnquiries();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    await axios.delete(`http://localhost:5000/enquiries/${id}`);

    getEnquiries();
  };

  return (
    <div className="container mt-4">

      <h2 className="text-success mb-4">
        🌱 Manage Enquiries
      </h2>

      <div className="table-responsive">

        <table className="table table-bordered table-hover">

          <thead className="table-success">

            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Reply</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {enquiries.map((item) => (

              <tr key={item._id}>

                <td>{item.fullName}</td>

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

                  {selectedId === item._id ? (

                    <>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />

                      <button
                        className="btn btn-success btn-sm mt-2"
                        onClick={() => submitReply(item._id)}
                      >
                        Save Reply
                      </button>
                    </>

                  ) : (

                    item.reply || "No Reply Yet"

                  )}

                </td>

                <td>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setSelectedId(item._id)}
                  >
                    Reply
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEnquiry(item._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}