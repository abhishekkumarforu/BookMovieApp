import React, { useState } from "react";
import { Button } from "@material-ui/core";
import MovieLogo from "../../assets/logo.svg";
import "./Header.css";
import AuthModal from "./AuthModal";

function Header({ baseUrl, bookshow }) {
  const accessToken = sessionStorage.getItem("access-token");
  const [isAuthenticated, userHasAuthenticated] = useState(
    accessToken ? true : false
  );
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const logoutUser = () => {
    fetch(baseUrl + "auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: "Bearer " + isAuthenticated,
      },
    }).then((response) => {
      sessionStorage.clear();
      userHasAuthenticated(false);
    });
  };

  const bookShowClick = () => {
    if (isAuthenticated) bookshow();
    else setIsOpen(true);
  };

  return (
    <header className="Navbar">
      <div className="Toolbar">
        <div className="logoDiv">
          <img src={MovieLogo} className="logo" alt="Header Logo" />
        </div>

        {bookshow && (
          <div style={{ marginRight: 10 }}>
            <Button variant="contained" color="primary" onClick={bookShowClick}>
              Book Show
            </Button>
          </div>
        )}

        {isAuthenticated ? (
          <Button variant="contained" color="default" onClick={logoutUser}>
            Logout
          </Button>
        ) : (
          <div>
            <AuthModal
              baseUrl={baseUrl}
              userHasAuthenticated={userHasAuthenticated}
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
