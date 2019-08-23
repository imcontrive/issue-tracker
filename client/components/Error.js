import React from "react";
import { NavLink } from "react-router-dom";

export function Error() {
  return (
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="has-text-centered has-text-danger is-size-1">404</h1>
          <h2 class="subtitle has-text-centered has-text-danger">
            OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND!
          </h2>
          <div className="has-text-centered">
            <NavLink to="/" className="button is-rounded has-text-success ">
              BACK TO HONEPAGE
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
