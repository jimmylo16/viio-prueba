import { useGlobalContext } from "@/hooks/useGlobalContext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const Modal = () => {
  const [clientData, setClientData] = useState({
    accountDescription: "some description",
    accountName: "some name",
  });
  const router = useRouter();
  const { client } = useGlobalContext();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const requestBackend = await axios.post(
        "http://localhost:5000/api/account",
        {
          clientId: client.id,
          accountDescription: clientData.accountDescription,
          accountName: clientData.accountName,
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(client);
  return (
    <>
      <label htmlFor="my-modal-4" className="btn">
        open modal
      </label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <form onSubmit={handleSubmit}>
            {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Account Name</span>
              </label>
              <input
                type="text"
                placeholder="accountName"
                value={clientData.accountName}
                onChange={({ target }) =>
                  setClientData((prev) => ({
                    ...prev,
                    accountName: target.value,
                  }))
                }
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Account Description</span>
              </label>
              <input
                type="text"
                placeholder="accountDescription"
                value={clientData.accountDescription}
                onChange={({ target }) =>
                  setClientData((prev) => ({
                    ...prev,
                    accountDescription: target.value,
                  }))
                }
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-outline btn-primay">Submit</button>
            </div>
            <label className="label"></label>
          </form>
        </label>
      </label>
    </>
  );
};
