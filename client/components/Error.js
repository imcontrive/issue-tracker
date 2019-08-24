import React from "react";
import { Link } from "react-router-dom";

export function Error() {
  return (
    <section className="hero is-light is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <h1 className="has-text-centered has-text-danger is-size-1">404</h1>
          <h2 className="subtitle has-text-centered has-text-danger">
            OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND!
          </h2>
          <div className="has-text-centered">
            <Link to="/" className="button is-rounded has-text-success ">
              BACK TO HONEPAGE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
