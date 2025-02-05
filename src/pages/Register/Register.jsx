import React, { useContext, useEffect, useState } from "react";
import "../Register/Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDataContext } from "../../Context/DataContext";

const Register = () => {
  const navigate = useNavigate();

  const { isAuthenticated, setisAuthenticated, setreload } =
    useDataContext();

  const [strongpassword, setstrongpassword] = useState(false);

  const [registerdata, setregisterdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (checkpasswordstrength(registerdata.password)) {
      setstrongpassword(true);
    } else {
      setstrongpassword(false);
    }
  }, [registerdata.password]);

  const handlechange = (e) => {
    setregisterdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handlesubmit(e) {
    e.preventDefault();
    setstrongpassword(false);
    axios
      .post(
        import.meta.env.VITE_SERVER + "/register",
        {
          username: registerdata.username,
          email: registerdata.email,
          password: registerdata.password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        setisAuthenticated(true);
        navigate("/");
        setstrongpassword(true);
        setreload((prev) => !prev);
      })
      .catch((error) => {
        setstrongpassword(true);
        toast.error(error.response.data.message);
      });
  }

  if (isAuthenticated) return navigate("/");

  return (
    <div className="Register">
      <form className="Registerform" onSubmit={handlesubmit} method="post">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username..."
          required
          onChange={handlechange}
          name="username"
          value={registerdata.username}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email..."
          required
          onChange={handlechange}
          name="email"
          value={registerdata.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password..."
          required
          onChange={handlechange}
          name="password"
          value={registerdata.password}
        />
        {!strongpassword && (
          <div
            style={{
              position: "relative",
              marginLeft: "auto",
              color: "red",
              paddingRight: "1rem",
              fontSize: "0.8rem",
              marginBlock: "0.5rem",
            }}
          >
            <p>Enter Strong password !!</p>
            <p>Atleast 8 Characters required,</p>
            <p>with special symbols and</p>
            <p>numbers!!!</p>
          </div>
        )}
        <button disabled={!strongpassword}>Register</button>
      </form>
    </div>
  );
};

export default Register;

function checkpasswordstrength(pass) {
  const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialchar = "@#$%&!?_";
  const numbers = "0123456789";

  if (pass) {
    if (pass.length >= 8 && alphabets.includes(pass[0])) {
      let num = false;
      let special = false;
      for (let i = 1; i < pass.length; i++) {
        if (specialchar.includes(pass[i])) {
          special = true;
        }
        if (numbers.includes(pass[i])) {
          num = true;
        }
        if (num && special) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
