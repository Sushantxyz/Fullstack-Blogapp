import React, { useContext, useState } from "react";
import "../Login/Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDataContext } from "../../Context/DataContext";

const Login = () => {
  const [logindata, setlogindata] = useState({ username: "", password: "" });
  const [buttonDisable, setbuttonDisable] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, setisAuthenticated, setreload } =
    useDataContext();

  const handlechange = (e) => {
    setlogindata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isAuthenticated) return navigate("/");

  function handlesubmit(e) {
    e.preventDefault();
    setbuttonDisable(true);
    axios
      .post(
        import.meta.env.VITE_SERVER + "/login",
        {
          username: logindata.username,
          password: logindata.password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        setisAuthenticated(true);
        setbuttonDisable(false);
        setreload((prev) => !prev);
        navigate("/");
      })
      .catch((error) => {
        setbuttonDisable(false);
        toast.error(error.response.data.message);
      });
    setlogindata({ username: "", password: "" });
  }

  return (
    <>
      <div className="login">
        <form
          className="loginform"
          onSubmit={(e) => handlesubmit(e)}
          method="post"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            value={logindata.username}
            name="username"
            placeholder="Enter Username..."
            onChange={(e) => handlechange(e)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            value={logindata.password}
            name="password"
            placeholder="Enter Password..."
            onChange={(e) => handlechange(e)}
          />
          <button disabled={buttonDisable ? true : false} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
