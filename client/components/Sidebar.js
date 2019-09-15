import React from "react";

const Sidebar = ({ user, handleCategoryFilter, handleFilter }) => {
  return (
    <div className="column">
      <div className="box has-background-light">
        <h2 className=" title is-4 has-text-centered">Filter</h2>
        <ul>
          {user.user && user.user.isAdmin ? (
            <li>
              Urgency
              <div className="field">
                <div className="control">
                  <div className="select">
                    <select
                      name="isUrgent"
                      onChange={e => {
                        handleFilter(e.target.name, e.target.value);
                      }}
                    >
                      <option value="all">All</option>
                      <option value="Very Urgent">Very Urgent</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Not Urgent">Not Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
          ) : null}
          <li>
            Categories
            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    name="category"
                    onChange={e => {
                      handleCategoryFilter(e.target.name, e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="electricity">electricity</option>
                    <option value="water">water</option>
                    <option value="food">food</option>
                    <option value="others">others</option>
                  </select>
                </div>
              </div>
            </div>
          </li>
          <li>
            Resolved
            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    name="isResolved"
                    onChange={e => {
                      handleFilter(e.target.name, e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    <option value=" "> Resolved</option>
                    <option value="">Unresolved</option>
                  </select>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
