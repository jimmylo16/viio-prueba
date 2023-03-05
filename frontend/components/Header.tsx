import { useGlobalContext } from "@/hooks/useGlobalContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const { setClient } = useGlobalContext();
  const handleLogin = () => {
    router.push("/auth/singin");
  };
  const handleRegister = () => {};
  const handleSignOut = () => {
    setClient({
      email: "jimmylo160061@gmail.com",
      password: "123456",
      token: "",
      id: "",
    });
    signOut();
  };

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-xl"
          onClick={() => router.push("/")}
        >
          Viio Test
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={handleLogin}>Log In</a>
          </li>
          <li>
            <a onClick={handleRegister}>Register</a>
          </li>
          <li>
            <a onClick={handleSignOut}>Sign Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
