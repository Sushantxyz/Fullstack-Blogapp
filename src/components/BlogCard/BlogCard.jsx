import React from "react";
import "../BlogCard/BlogCard.scss";

const BlogCard = ({ post }) => {
  return (
    <>
      <div className="BlogCard">
        <img loading="lazy" src={post.photo.url} alt="" />
        {post.title.length > 30 ? (
          <>
            <b>Title : {post.title.slice(0, 25)}..</b>
          </>
        ) : (
          <>
           <b>Title : {post.title}</b>
          </>
        )}
        <span>
          <span>Posted on :</span> {post.createdAt.split("T")[0]}
        </span>
        <p>Description : {post.description.slice(0, 150)}...</p>
      </div>
    </>
  );
};

export default BlogCard;
