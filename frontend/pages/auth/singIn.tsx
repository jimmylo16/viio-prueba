import { LoginCard } from "@/components/login/LoginCard";
import GoogleSvg from "@/components/svg/Google.svg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <LoginCard>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="flex justify-center">
          <button
            className="btn btn-ghost"
            onClick={() =>
              // signIn(provider.id, {
              //   callbackUrl: "http://localhost:3000/api/auth/signin",
              // })
              signIn(provider.id)
            }
          >
            <GoogleSvg></GoogleSvg>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </LoginCard>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}
