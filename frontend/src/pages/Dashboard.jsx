import { useEffect, useState } from "react";
import API from "../api/client";

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");

  // Fetch all grievances
  const fetchData = async () => {
    const res = await API.get("/grievances");
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create grievance
  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/grievances", form);
    setForm({});
    fetchData();
  };

  // Delete grievance
  const handleDelete = async (id) => {
    await API.delete(`/grievances/${id}`);
    fetchData();
  };

  // ✅ UPDATE grievance (mark resolved)
  const handleUpdate = async (id) => {
    await API.put(`/grievances/${id}`, {
      status: "Resolved"
    });
    fetchData();
  };

  // Search grievance
  const handleSearch = async () => {
    if (!search.trim()) {
      fetchData();
      return;
    }

    const res = await API.get(`/grievances/search?title=${search}`);
    setGrievances(res.data);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h2>Dashboard</h2>
        <button onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>
          Logout
        </button>
      </div>

      {/* Add grievance */}
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          value={form.category || ""}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Hostel">Hostel</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>

        <button>Add Grievance</button>
      </form>

      {/* Search */}
      <div className="search">
        <input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => {
          setSearch("");
          fetchData();
        }}>
          Clear
        </button>
      </div>

      {/* List */}
      <div className="list">
        {grievances.map((g) => (
          <div key={g._id} className="card">
            <h4>{g.title}</h4>
            <p>{g.description}</p>

            {/* Status */}
            <span style={{
              color: g.status === "Resolved" ? "green" : "red",
              fontWeight: "bold"
            }}>
              {g.status}
            </span>

            <div style={{ marginTop: "10px" }}>
              {/* Update button */}
              {g.status !== "Resolved" && (
                <button onClick={() => handleUpdate(g._id)}>
                  Mark Resolved
                </button>
              )}

              {/* Delete button */}
              <button
                onClick={() => handleDelete(g._id)}
                style={{ marginLeft: "10px", background: "red" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}