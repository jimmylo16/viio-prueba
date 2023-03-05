import { useGlobalContext } from "@/hooks/useGlobalContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const TableTrans = ({ id }: any) => {
  const [accounts, setAccounts] = useState([]);
  const { client } = useGlobalContext();
  // useEffect(() => {
  //   if (client.id) {
  //     (async () => {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/transaction/findByAccount/${client.id}`
  //       );
  //       setAccounts(response.data.accounts);
  //     })();
  //   }
  // }, [id]);
  console.log(id, accounts, client);
  return (
    <div className="overflow-x-auto">
      {accounts.length == 0 ? (
        <>there is no accounts for this user</>
      ) : (
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nameee</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
