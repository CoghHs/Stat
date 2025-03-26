import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export default function TabBar({ username }: { username: string }) {
  return (
    <div className="bg-indigo-600 text-white px-6 py-3">
      <nav>
        <ul className="flex items-center text-xl gap-4">
          <li className="flex-1/2 font-extrabold">
            <Link href="/board">STAT</Link>
          </li>
          <li>
            <Link href="/board">
              <GiHamburgerMenu />
            </Link>
          </li>
          <li>
            <Link href={`/user/${username}`}>
              <FaRegUserCircle />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
