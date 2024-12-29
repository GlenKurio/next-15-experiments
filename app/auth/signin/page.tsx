import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, providerMap, signIn } from "@/auth";

const SIGNIN_ERROR_URL = "/auth/error";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl: string | undefined };
}) {
  //   need to await the searchParams to avoid warning: Dynamic APIs are Asynchronous (https://nextjs.org/docs/messages/sync-dynamic-apis)
  const { callbackUrl } = await searchParams;
  //   TODO: Can do it through the middleware by specifying different types of routes with differrent level of authentication protection
  const session = await auth();
  if (session && session.user) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col gap-2">
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <label htmlFor="email">
          Email
          <input name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" id="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>
      {Object.values(providerMap)?.map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              // Use the pre-extracted callbackUrl here
              await signIn(provider.id, {
                redirectTo: callbackUrl,
              });
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
