import React from "react";
import "./Nopost.scss"
import { Link } from "react-router-dom";

const Nopost = () => {
  return (
    <div className="noPost">
      <h1>No posts here 😥</h1>
      <button>
        <Link to={"/post"}>Create One ↗</Link>
      </button>
      <button>
        <Link to={"/"}>Home ↗</Link>
      </button>
    </div>
  );
};

export default Nopost;
