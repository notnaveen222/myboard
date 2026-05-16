"use client";

import { ReactEventHandler, useState } from "react";

export default function auth() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  return (
    <div className="flex flex-col space-y-5  flex-1 justify-center items-center">
      <div>Sign up</div>
      <div className="flex flex-col space-y-5 ">
        <input
          className="border border-white rounded-md px-2 py-1  outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
        ></input>
        <input
          className="border border-white rounded-md px-2 py-1  outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
        ></input>
      </div>
      <button
        onClick={() => {
          console.log(email, password);
        }}
      >
        Submit
      </button>
    </div>
  );
}
