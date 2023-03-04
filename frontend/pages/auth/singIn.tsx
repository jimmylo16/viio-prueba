import GoogleSvg from "@/components/svg/Google.svg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  csrfToken,
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <form
        method="post"
        action="/api/auth/signin/email"
        className="flex flex-col bg-slate-100 border-l-sky-100 border-2 gap-4 p-8"
      >
        <div className="border-[1px] p-1">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="py-1">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-black"
          />
        </div>
        <button type="submit" className="border-black border-[1px]">
          Sign in with Email
        </button>

        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className="flex flex-row items-center  cursor-pointer border-black border-[1px]"
          >
            <GoogleSvg></GoogleSvg>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </form>
    </div>
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
  const csrfToken = await getCsrfToken(context);

  const providers = await getProviders();
  return {
    props: { csrfToken, providers: providers ?? [] },
  };
}
