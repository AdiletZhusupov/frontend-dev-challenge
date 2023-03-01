import { Link } from "react-router-dom";
import { AiFillBell } from "react-icons/ai";
import { HiSquares2X2 } from "react-icons/hi2";
import { VscAccount } from "react-icons/vsc";
import { PostsNum } from "./PostsNum";
export const Navbar = () => {
  return (
    <nav className="h-16 p-4 bg-black text-white flex items-center justify-between">
      <Link to="/">Arbit Blog</Link>
      <div className="flex items-center justify-between w-52">
        <PostsNum />
        <AiFillBell />
        <HiSquares2X2 />
        <VscAccount />
      </div>
    </nav>
  );
};
