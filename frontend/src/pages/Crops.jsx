import { useEffect, useState } from "react";
import axios from "axios";

export default function Crops() {
  const [cropName, setCropName] = useState("");
  const [cropArea, setCropArea] = useState("");
  const [cropStatus, setCropStatus] = useState("");
  const [cropPlace, setCropPlace] = useState("");
  const [crops, setCrops] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔐 AUTH HEADER (IMPORTANT)
  const authHeader = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  // 🌾 GET CROPS (USER ONLY)
  const fetchCrops = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/crops",
        authHeader
      );
      setCrops(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🧠 CREATE / UPDATE
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        cropName,
        cropArea: Number(cropArea),
        cropStatus,
        cropPlace,
      };

      if (editId) {
        await axios.put(
          `http://localhost:5000/crops/${editId}`,
          payload,
          authHeader
        );
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/crops",
          payload,
          authHeader
        );
      }

      resetForm();
      fetchCrops();
    } catch (error) {
      console.log(error);
    }
  };

  // ✏️ EDIT
  const editCrop = (crop) => {
    setEditId(crop._id);
    setCropName(crop.cropName || "");
    setCropArea(crop.cropArea || "");
    setCropStatus(crop.cropStatus || "");
    setCropPlace(crop.cropPlace || "");
  };

  // ❌ DELETE
  const deleteCrop = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/crops/${id}`,
        authHeader
      );

      setEditId(null);
      resetForm();
      fetchCrops();
    } catch (error) {
      console.log(error);
    }
  };

  // 🔄 RESET FORM
  const resetForm = () => {
    setCropName("");
    setCropArea("");
    setCropStatus("");
    setCropPlace("");
  };

  // ❎ CANCEL
  const cancelEdit = () => {
    setEditId(null);
    resetForm();
  };

  return (
    <div className="container mt-4">

      {/* ================= FORM ================= */}
      <div className="card shadow p-4 mb-4">
        <h3>{editId ? "Update Crop" : "Add Crop"}</h3>

        <form onSubmit={handleForm}>

          <div className="mb-3">
            <label>Crop Name</label>
            <input
              className="form-control"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Crop Area</label>
            <input
              type="number"
              className="form-control"
              value={cropArea}
              onChange={(e) => setCropArea(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Status</label>
            <select
              className="form-select"
              value={cropStatus}
              onChange={(e) => setCropStatus(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Growing">Growing</option>
              <option value="Harvested">Harvested</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Place</label>
            <input
              className="form-control"
              value={cropPlace}
              onChange={(e) => setCropPlace(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success me-2">
            {editId ? "Update Crop" : "Add Crop"}
          </button>

          {editId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* ================= TABLE ================= */}
      <div className="card shadow p-4">
        <h3>My Crops</h3>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Status</th>
              <th>Place</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {crops.map((crop) => (
              <tr key={crop._id}>
                <td>{crop.cropName}</td>
                <td>{crop.cropArea}</td>
                <td>{crop.cropStatus}</td>
                <td>{crop.cropPlace}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => editCrop(crop)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCrop(crop._id)}
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