import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDataContext } from "./Context/DataContext";
import Header from "./components/header/Header";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Details = lazy(() => import("./pages/Details/Details.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Post = lazy(() => import("./pages/Post/Post.jsx"));
const Register = lazy(() => import("./pages/Register/Register.jsx"));
const Update = lazy(() => import("./pages/Update/Update.jsx"));
import MainShimmer, { Loader, LoginShimmer } from "./components/Loader/Loader";

import "./pages/mediaquery.scss";
import { useTheme } from "./Context/ThemeContext";

function App() {
  const [loading, setloading] = useState(true);
  const { isAuthenticated, setuser, setisAuthenticated, reload } =
    useDataContext();

  useEffect(() => {
    setloading(true);
    axios
      .get(import.meta.env.VITE_SERVER + "/getuser", { withCredentials: true })
      .then((data) => {
        setloading(false);
        setisAuthenticated(true);
        setuser(data.data._user.username);
      })
      .catch((error) => {
        setloading(false);
        setisAuthenticated(false);
      });
  }, [reload]);

  

  if (loading) {
    return <>{isAuthenticated ? <MainShimmer /> : <LoginShimmer />}</>;
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Home />} />
                <Route path="/login" element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/update" element={<Update />} />
                <Route path="/:id" element={<Details />} />
              </>
            ) : (
              <>
                <Route path="/*" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
