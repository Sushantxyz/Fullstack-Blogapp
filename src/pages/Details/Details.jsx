import React, { useContext, useEffect, useState } from "react";
import "../Details/Details.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { category } from "../../assets/data/data";
import { DetailShimmer } from "../../components/Loader/Loader";
import { useDataContext } from "../../Context/DataContext";

const Details = () => {
  const { user } = useDataContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setpost] = useState(null);
  const [edit, setedit] = useState(false);
  const [title, settitle] = useState("");
  const [disable, setdisable] = useState(false);
  const [desc, setdesc] = useState("");

  useEffect(() => {
    async function a() {
      const data = await axios.get(import.meta.env.VITE_SERVERPOST + `/${id}`, {
        withCredentials: true,
      });
      setpost(data.data.postdata);
    }
    a();
  }, [edit]);

  function deletehandler() {
    const data = axios
      .delete(import.meta.env.VITE_SERVERPOST + `/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        navigate("/");
      });
  }

  function updatehandler() {
    setedit((prev) => !prev);
    settitle(post.title);
    setdesc(post.description);
  }

  function edithandler() {
    setdisable(true);
    axios
      .put(
        import.meta.env.VITE_SERVERPOST + `/${id}`,
        {
          title,
          description: desc,
        },
        { withCredentials: true }
      )
      .then((data) => {
        setdisable(false);
        setedit((prev) => !prev);
        toast.success("Updated");
      })
      .catch((error) => {
        setdisable(false);
        toast.error("Make sure to keep title and description unique...");
      });
  }

  return (
    <>
      <div className="Blog-Details">
        {post ? (
          <>
            <img src={post.photo.url} alt="" style={{ width: "100%" }} />
            <h2>
              {!edit && <>Title : {post.title}</>}
              {user == post.username && (
                <>
                  {edit ? (
                    <>
                      <input
                        type="text"
                        onChange={(e) => settitle(e.target.value)}
                        value={title}
                        className="titleinput"
                      />
                    </>
                  ) : (
                    <>
                      <div>
                        <button onClick={updatehandler}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button onClick={deletehandler}>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </h2>
            <>
              {edit ? (
                <>
                  <textarea
                    type=""
                    className="descriptioninput"
                    onChange={(e) => {
                      setdesc(e.target.value);
                    }}
                    value={desc}
                  />
                </>
              ) : (
                <p>
                  <span>Decription</span> : {post.description}
                </p>
              )}

              <p className="auth">
                Auth :{" "}
                <Link className="cat" to={`/?username=${post.username}`}>
                  {post.username}
                </Link>
              </p>

              <div className="cat">
                Category :{" "}
                {category &&
                  post.category.map((data, index) => (
                    <span key={index} onClick={() => navigate("/?cat=" + data)}>
                      {data}
                    </span>
                  ))}
              </div>

              <p className="posttime">
                Posted on : {post.createdAt.split("T")[0]}
              </p>

              {edit && (
                <button disabled={disable} className="updatebutton" onClick={edithandler}>
                  Update
                </button>
              )}
            </>
          </>
        ) : (
          <DetailShimmer />
        )}
      </div>
    </>
  );
};

export default Details;
