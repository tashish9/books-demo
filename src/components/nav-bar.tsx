import Image from "next/image";
import Link from "next/link";

import { BiChevronDown } from "react-icons/bi";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-10 py-3 shadow lg:px-20">
      <div className="relative aspect-auto h-16 w-64 overflow-hidden">
        <Image
          src="/logo.png"
          alt="logo"
          fill
          className="aspect-auto"
          priority
        />
      </div>
      <ul className="flex gap-10 font-bold leading-[21.6px] text-primary">
        <li>
          <Link className="underline decoration-2 underline-offset-4" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="no-underline" href="/">
            Favourites
          </Link>
        </li>
      </ul>
      <div className="flex w-64 items-center justify-end  gap-1">
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
          <Image src="/avatar.jpg" fill alt="avatar" />
        </div>
        <BiChevronDown className="text-xl" />
      </div>
    </div>
  );
};

export default NavBar;
