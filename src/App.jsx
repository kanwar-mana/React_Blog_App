import "./App.css";
import "./index.css";
import { useState, useEffect, use } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { Header, Footer } from "./components";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error checking auth status:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="flex flex-wrap content-between min-h-screen bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>{/* <Outlet/> */}</main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
