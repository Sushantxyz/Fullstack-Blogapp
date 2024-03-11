import React, { useContext, useEffect, useState } from "react";
import "./Post.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { category } from "../../assets/data/data.js";
import { useDataContext } from "../../Context/DataContext";

const Post = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [file, setfile] = useState(null);
  const [image, setimage] = useState(null);
  const [cat, setcat] = useState([]);
  const navigate = useNavigate();
  const { user } = useDataContext();
  const [disable, setdisable] = useState(false);

  function displaycategory(catdata) {
    if (cat.includes(catdata)) {
      setcat((prev) => prev.filter((c) => c !== catdata));
    } else {
      setcat((prev) => [...prev, catdata]);
    }
  }

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

  async function submithandler(e) {
    e.preventDefault();
    setdisable(true);
    const newPost = {
      username: user,
      title,
      description,
      category: cat,
      photo: image,
    };

    axios
      .post(import.meta.env.VITE_SERVERPOST + "/create", newPost, {
        withCredentials: true,
      })
      .then((data) => {
        toast.success("Posted created !!");
        setdisable(false);
        navigate(`/${data.data.id}`);
      })
      .catch((error) => {
        setdisable(false);
        toast.error("make sure contain is unique !!");
      });
  }

  return (
    <>
      <div className="post">
        <div className={image && "postimg"}>
          {image && <img src={image} alt="" />}
        </div>

        <form onSubmit={(e) => submithandler(e)}>
          <label htmlFor="fileimg">
            <i className="fa-solid fa-circle-plus"></i>
            {file ? file.name : " Upload Image"}
          </label>

          <div>
            Categories :
            {category.map((data, index) => (
              <span
                key={index}
                className={cat.includes(data.category) ? "selected" : ""}
                onClick={(e) => displaycategory(data.category)}
              >
                {data.category}
              </span>
            ))}
          </div>

          <input
            type="file"
            id="fileimg"
            required
            onChange={(e) => setfile(e.target.files[0])}
            style={{ display: "none" }}
          />

          <input
            type="text"
            placeholder="Title..."
            onChange={(e) => settitle(e.target.value)}
            required
          />

          <textarea
            name=""
            id=""
            placeholder="Write your story..."
            onChange={(e) => setdescription(e.target.value)}
            required
          />

          <button disabled={disable} type="submit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
