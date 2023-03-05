import { useGlobalContext } from "@/hooks/useGlobalContext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const LoginCard = ({ children }: any) => {
  const router = useRouter();
  const [clientData, setClientData] = useState({
    email: "jimmylo1600623111@gmail.com",
    password: "123456",
  });
  const [error, setError] = useState(false);
  const { setClient } = useGlobalContext();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const requestBackend = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: clientData.email,
          password: clientData.password,
        }
      );
      setClient(requestBackend.data);
      setError(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError((error as any).message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <form onSubmit={handleSubmit}>
        <div className="card w-96 glass">
          <div className="card-body">
            {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="jimmylo16@gmail.com"
                value={clientData.email}
                onChange={({ target }) =>
                  setClientData((prev) => ({ ...prev, email: target.value }))
                }
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="123456"
                value={clientData.password}
                onChange={({ target }) =>
                  setClientData((prev) => ({ ...prev, password: target.value }))
                }
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="card-actions justify-end">
              <button
                className="btn btn-outline btn-secondary"
                onClick={() => router.push("/")}
              >
                Go back
              </button>
              <button className="btn btn-outline btn-succes">Sign in</button>
              <button className="btn btn-outline btn-warning">Register</button>
            </div>
            <label className="label">
              <span className="label-text">{error ? error : ""}</span>
            </label>
            <div className="border-[1px] "></div>
            {children}
          </div>
        </div>
      </form>
    </div>
  );
};
