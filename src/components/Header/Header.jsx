import React from "react";
import { useSelector } from "react-redux";
import { Logo, LogoutBtn, Container, Button } from "../index.js";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "Login", path: "/login", active: !isAuthenticated },
    { name: "Register", path: "/signup", active: !isAuthenticated },
    { name: "All Posts", path: "/all-posts", active: isAuthenticated },
    { name: "Create Post", path: "/add-post", active: isAuthenticated },
  ];
  return (
    <>
      <header className="py-4 shadow bg-gray-700">
        <Container>
          <nav className="flex">
            <div>
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <ul className="flex ml-auto space-x-4 items-center">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <Button onClick={() => navigate(item.path)}>
                        {item.name}
                      </Button>
                    </li>
                  )
              )}
              {isAuthenticated && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
