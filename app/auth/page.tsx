"use client";

import { useState } from "react";
import axios from "axios";
export default function auth() {
  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("/api/auth/signup", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col space-y-5  flex-1 justify-center items-center">
      <div>Sign up</div>
      <div className="flex flex-col space-y-3 ">
        <input
          className="border border-white rounded-md px-2 py-1 outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Name"
        ></input>
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
          handleSignUp();
        }}
      >
        Submit
      </button>
    </div>
  );
}
