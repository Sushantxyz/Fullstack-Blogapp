import React from "react";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <h2>Loading ....</h2>
    </div>
  );
};

export const Shimmer = () => {
  return (
    <div className="shimmer">
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>

      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>

      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const HeaderShimmer = () => {
  return <div className="HeaderShimmer"></div>;
};
export const CarousolShimmer = () => {
  return <div className="CarousolShimmer"></div>;
};

const MainShimmer = () => {
  return (
    <>
      <div className="mainShimmer">
        <HeaderShimmer />
        <CarousolShimmer />
        <Shimmer />
      </div>
    </>
  );
};

export const LoginShimmer = () => {
  return (
    <>
      <div>
        <HeaderShimmer />
        <div className="LoginShimmer">
          <div></div>
        </div>
      </div>
    </>
  );
};

export const DetailShimmer = () => {
  return (
    <>
      <div className="detailParent">
        <HeaderShimmer />
        <div className="DetailShimmer">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};
export default MainShimmer;
