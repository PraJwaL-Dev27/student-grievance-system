import { useState } from "react";
import API from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
     alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name"
          onChange={e => setForm({...form, name: e.target.value})} />

        <input placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />

        <button>Register</button>
      </form>

      <p>
        Already have account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}