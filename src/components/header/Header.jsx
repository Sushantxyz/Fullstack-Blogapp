import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDataContext } from "../../Context/DataContext.jsx";
import "../header/Header.scss";
import toast from "react-hot-toast";
import { useTheme } from "../../Context/ThemeContext.jsx";

const Header = () => {
  const navigate = useNavigate();
  const [openprofile, setopenprofile] = useState(false);
  const [userdata, setuserdata] = useState();

  const {
    isAuthenticated,
    setisAuthenticated,
    user,
    setuser,
    reload,
    setreload,
  } = useDataContext();

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(import.meta.env.VITE_SERVER + "/getuser", {
          withCredentials: true,
        })
        .then((data) => {
          setuserdata(data.data._user.profilepicture.url);
        });
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, reload]);

  function handleSignOut() {
    setopenprofile((prev) => !prev);

    const data = axios
      .post(
        import.meta.env.VITE_SERVER + "/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setisAuthenticated(false);
        setreload((prev) => !prev);
        setuser("");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  return (
    <>
      <div className="container">
        <div className="logo" onClick={() => navigate("/")}>
          Sundar Blog
        </div>

        {isAuthenticated && (
          <nav className="generalnav">
            <ul>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                Home
              </Link>
            </ul>
            <ul>About</ul>
            <ul>Contact Us</ul>
            <ul>
              <Link
                to={`/?username=${user}`}
                style={{ textDecoration: "none" }}
              >
                My Pages
              </Link>
            </ul>
          </nav>
        )}

        {!isAuthenticated ? (
          <RegisterLogin theme={theme} toggleTheme={toggleTheme} />
        ) : (
          <div className="profile">
            <div className="profile-pic">
              <div onClick={() => setopenprofile((prev) => !prev)}>
                {!userdata ? (
                  <i
                    className="fa-solid fa-user"
                    style={{ paddingInline: "0.2rem" }}
                  ></i>
                ) : (
                  <img src={userdata} />
                )}
              </div>
              <div onClick={toggleTheme} className="theme">
                {theme === "light" ? "🌙" : "🔆"}
              </div>
            </div>
          </div>
        )}

        {openprofile && (
          <div className="profile-details">
            <ul>
              <li
                className="phonenav nav"
                onClick={() => setopenprofile((prev) => !prev)}
              >
                <i className="fa-solid fa-house"></i>
                <Link
                  to={isAuthenticated ? "/" : "/login"}
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>

              <li className="nav">
                <i className="fa-solid fa-plus"></i>
                <Link
                  onClick={() => setopenprofile((prev) => !prev)}
                  to="/post"
                >
                  Create Post
                </Link>
              </li>

              <li className="nav">
                <i className="fa-solid fa-pen"></i>
                <Link
                  onClick={() => setopenprofile((prev) => !prev)}
                  to="/update"
                >
                  Update profile
                </Link>
              </li>

              <li
                className="phonenav nav"
                onClick={() => setopenprofile((prev) => !prev)}
              >
                <i className="fa-solid fa-file-circle-plus"></i>
                <Link
                  to={isAuthenticated ? `/?username=${user}` : "/login"}
                  style={{ textDecoration: "none" }}
                >
                  My Pages
                </Link>
              </li>

              <li
                className="phonenav nav"
                onClick={() => setopenprofile((prev) => !prev)}
              >
                <i className="fa-solid fa-message"></i>
                Contact us
              </li>

              <li onClick={handleSignOut} className="nav">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Signout
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

const RegisterLogin = ({theme,toggleTheme}) => {
  return (
    <div className="nav-auth">
      <div className="nav-login">
        <Link to="/login">Login</Link>
      </div>
      <div className="nav-register">
        <Link to="/register">Register</Link>
      </div>
      <div onClick={toggleTheme} className="theme">
        {theme === "light" ? "🌙" : "🔆"}
      </div>
    </div>
  );
};
