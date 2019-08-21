import React, { useState } from "react";

const InviteUser = function(props) {
  const [email, setEmail] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setEmail(value);
  };

  function handleSubmit(){
    console.log(email)
    props.history.push("/")
  }

  return (
    <>
      <p>Invite User</p>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default InviteUser;
