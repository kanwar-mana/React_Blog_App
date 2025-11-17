import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((s) => s.auth.isAuthenticated);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
