import React, { useContext, useEffect, useState } from "react";
import "../Update/Update.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDataContext } from "../../Context/DataContext";

const Update = () => {
  const [updatedusername, setupdatedusername] = useState("");
  const [password, setpassword] = useState("");
  const [file, setfile] = useState(null);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const { setreload } = useDataContext();
  const [disable, setdisable] = useState(false);

  function handlechange(file) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setimage(reader.result);
      };
    }
  }

  useEffect(() => {
    handlechange(file);
  }, [file]);

  function submithandler(e) {
    e.preventDefault();
    setdisable(true);
    const newPost = {
      updatedusername,
      password,
      profilepicture: image,
    };

    axios
      .put(import.meta.env.VITE_SERVER + "/update", newPost, {
        withCredentials: true,
      })
      .then((data) => {
        setreload((prev) => !prev);
        setdisable(false);
        navigate(`/`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setdisable(false);
      });
  }
  return (
    <>
      <div className="update">
        <form onSubmit={submithandler}>
          <label id="updateimg">
            <i className="fa-solid fa-circle-plus"></i> Update Image
          </label>
          <input
            type="file"
            className="updatefile"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <label>Update Username</label>
          <input
            required
            type="text"
            className="updatetext"
            placeholder="Enter Username..."
            onChange={(e) => setupdatedusername(e.target.value)}
          />
          <label>Update Password</label>
          <input
            required
            type="password"
            className="updatetext"
            placeholder="Enter password..."
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            className="updatebutton"
            style={{ width: "250px", marginTop: "1rem" }}
            type="submit"
            disabled={disable}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Update;
