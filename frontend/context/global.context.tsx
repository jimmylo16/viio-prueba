import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type globalProviderT = {
  client: Client;
  setClient: Dispatch<SetStateAction<Client>>;
};

type Client = {
  email: string;
  password: string;
  token: string;
  id: string;
};
export const globalContext = createContext<globalProviderT>(
  {} as globalProviderT
);

type globalProvider = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: globalProvider) => {
  const [client, setClient] = useState<Client>({
    email: "jimmylo1600623111@gmail.com",
    password: "123456",
    token: "",
    id: "",
  });
  return (
    <>
      <globalContext.Provider value={{ client, setClient }}>
        {children}
      </globalContext.Provider>
    </>
  );
};
