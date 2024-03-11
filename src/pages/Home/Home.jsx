import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Category } from "../../components/Slider/Slider";
import { Shimmer } from "../../components/Loader/Loader";
import BlogCard from "../../components/BlogCard/BlogCard";
import Nopost from "../../components/NoPost/Nopost";
import Pagination from "../../components/Pagination/Pagination.jsx";
import "../../pages/Home/Home.scss";
import toast from "react-hot-toast";

const Home = () => {
  const [posts, setposts] = useState([]);
  const [noPost, setnoPost] = useState(false);
  const [count, setcount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    async function a() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVERPOST + `/${location.search}`,
          {
            withCredentials: true,
          }
        );
        setposts(res.data.posts);
        setcount(res.data.count);

        if (res.data.posts.length === 0) {
          setnoPost(true);
        } else {
          setnoPost(false);
        }
      } catch (error) {
        toast.error("Error loading post!! Please Refresh....");
      }
    }
    a();
  }, [location]);


  return (
    <>
      <Category key="unique-key" />
      <div className="Blogwrapper">
        {posts.length >= 1 && posts ? (
          posts.map((post, index) => (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/${post._id}`}
              key={index}
            >
              <BlogCard post={post} />
            </Link>
          ))
        ) : !noPost ? (
          <Shimmer />
        ) : (
          <Nopost />
        )}
      </div>
      <Pagination count={count} />
    </>
  );
};

export default Home;
