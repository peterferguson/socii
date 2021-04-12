import {
  auth,
  signOut,
  googleAuthProvider,
  userFirstName,
  facebookAuthProvider,
} from "@lib/firebase";
import { UserContext } from "@lib/context";
import Head from "@components/Head";
import { useContext } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const BackdropFilter = dynamic(
  () => {
    return import("react-backdrop-filter");
  },
  { ssr: false }
);

auth.onAuthStateChanged((user) => {
  if (user) {
    toast.dismiss();
    toast.success(`Welcome ${userFirstName(user)}`);
  }
});

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButtons />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      <Head title="Enter" description="Sign up for this amazing app!" />
      <div className="py-3 max-w-xl mx-auto">
        <BackdropFilter
          className="px-4 py-8 bg-white shadow-lg rounded-3xl bg-clip-padding bg-opacity-60 border border-gray-200"
          filter={"blur(10px) sepia(50%)"}
          canvasFallback={true}
          html2canvasOpts={{ allowTaint: true }}
        >
          <div className="max-w-md mx-auto">
            <div className="w-full text-center p-8 text-3xl font-bold">
              Sign in to your account
            </div>
            <div className="leading-6 sm:text-lg sm:leading-7">
              <p className="text-md">Email</p>
              <form onSubmit={null}>
                <div className="w-full">
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                    placeholder="warren@buffet.com"
                  />
                </div>
                <p className="text-md">Password</p>
                <div className="w-full">
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    placeholder="**********"
                  />
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <input className="ml-2 leading-tight" type="checkbox" />
                      <span className="text-sm"> Remember me</span>
                    </div>
                    <div>
                      <a
                        className="font-bold text-sm text-purple-500 hover:text-purple-800"
                        href="#password-request"
                      >
                        forgot password
                      </a>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded bg-purple-theme w-full text-white py-3 px-4 mb-3 leading-tight font-bold"
                  disabled={false}
                >
                  Sign in
                </button>
              </form>
            </div>
            <div className="w-full border-b py-3 border-gray-400 h-3.5 text-center">
              <span className="py-0 px-2.5 bg-white text-gray-400">
                Or continue with{" "}
              </span>
            </div>
            {!user && !username && <SignInButtons />}
            {user && username && <SignOutComponent />}
          </div>
        </BackdropFilter>
      </div>
    </main>
  );
}

// Sign in with Google button
function SignInButtons() {
  const signInPopUp = async (authProvider) =>
    await auth.signInWithPopup(authProvider);

  return (
    <div className="flex justify-center p-8 space-x-8">
      <button
        className="justify-center rounded m-2 p-2 text-white border-solid border-2 border-gray-900"
        onClick={() => signInPopUp(googleAuthProvider)}
      >
        <img src={"/icons/google.png"} width="30px" />
      </button>
      <button
        className="justify-center rounded m-2 p-2 text-white border-solid border-2 border-gray-900"
        onClick={() => null}
      >
        <img
          src={"/icons/twitter.png"}
          width="30px"
          className="object- object-center"
        />
      </button>
      <button
        className="justify-center rounded m-2 p-2 text-white border-solid border-2 border-gray-900"
        onClick={() => null}
      >
        <img src={"/icons/apple.png"} width="30px" />
      </button>
      <button
        className="justify-center rounded m-2 p-2 text-white border-solid border-2 border-gray-900"
        onClick={() => signInPopUp(facebookAuthProvider)}
      >
        <img src={"/icons/fb.png"} width="30px" />
      </button>
    </div>
  );
}

// Sign out button
function SignOutComponent() {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <p>Hey {userFirstName}!</p>
      <button
        className="flex rounded m-2 p-2 text-gray-900 bg-white border-solid border-2 border-gray-300"
        onClick={() => signOut(null, userFirstName(user))}
      >
        Sign Out
      </button>
    </div>
  );
}
