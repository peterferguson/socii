import { UserContext } from "@lib/context";
import { auth, userFirstName } from "@lib/firebase";

import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext } from "react";

import toast from "react-hot-toast";

// Top Navigation Bar
export default function Navbar() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">HOME</button>
          </Link>
        </li>

        {/* Is signed in */}
        {username && (
          // React Fragmentation is empty html allowing us to have children without an actual parent
          <>
            <li className='push-left'>
            <button onClick={() => SignOut(router, userFirstName(user))}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write a Post</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoUrl}></img>
              </Link>
            </li>
          </>
        )}
        {/* Not signed in or has no username */}
        {!username && (
          <Link href="/enter">
            <button>Log in!</button>
          </Link>
        )}
      </ul>
    </nav>
  );
}

function SignOut(router, firstname) {
  toast(`Bye for now ${firstname}!`, {icon: "👋"});
  auth.signOut();
  router.push('/enter');
}
