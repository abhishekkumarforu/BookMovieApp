import React, { useState } from "react";
import BookShow from "../bookshow/BookShow";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Details from "../Details/Details";
import Confirmation from "../confirmation/Confirmation";

const baseUrl = "/api/v1/";

function Controller() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/movie/:id"
          component={(props) => <Details {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/bookshow/:id"
          component={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          component={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Controller;
