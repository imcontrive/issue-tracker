import React, { useState } from "react";

const InviteUser = function(props) {
  const [email, setEmail] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setEmail(value);
  }

  function handleSubmit() {
    props.history.push("/");
  }

  return (
    <>
      <p className="subtitle">Invite User</p>
      <input className="input" name="email" placeholder="Email" onChange={handleChange} />
      <button className="button" onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default InviteUser;
