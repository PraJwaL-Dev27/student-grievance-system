import { useState } from "react";
import API from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />

        <button>Login</button>
      </form>

      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}