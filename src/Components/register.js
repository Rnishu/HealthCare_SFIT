import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [medicalStaff, setMedicalStaff] = useState(false);
  const navigate = useNavigate();
  const toggleMedicalStaff = () => {
    setMedicalStaff(!medicalStaff);
  };
  async function register() {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          medicalStaff,
        }),
      });
      const data = await response.json();
      if (data.status === "ok") {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <br></br>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br></br>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <br></br>
      <input type="button" id="medStaff" onClick={toggleMedicalStaff}></input>
      <label htmlFor="medStaff">Are you a Medical Staff?</label>
      <br></br>
      <button onClick={register}>Register</button>
      <br></br>
      <a href="./login">Login?</a>
    </div>
  );
}

export default Register;
