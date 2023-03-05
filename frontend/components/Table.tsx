import { useGlobalContext } from "@/hooks/useGlobalContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
type accountT = {
  accountId: string;
  accountName: string;
  accountDescription: string;
};
export const Table = ({ id }: any) => {
  const [accounts, setAccounts] = useState<accountT[]>([]);
  const { client } = useGlobalContext();
  useEffect(() => {
    if (client.id) {
      (async () => {
        const response = await axios.get(
          `http://localhost:5000/api/account/findByClient/${client.id}`
        );
        setAccounts(response.data.accounts);
      })();
    }
  }, [client]);
  console.log(accounts);
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
              <th>account Name</th>
              <th>account Description</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => {
              return (
                <>
                  <tr>
                    <th>{index + 1}</th>
                    <td>{account.accountName}</td>
                    <td>{account.accountDescription}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
