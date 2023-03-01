import { useSelector } from "react-redux/es/exports";
import { RootState } from "../store/store";

export const PostsNum = () => {
  const { posts } = useSelector(
    (state: RootState) => state.posts
  );
  return (
    <div className="relative inline-flex items-center">
      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 flex justify-center items-center items">
        <span className="text-xs">{posts?.length}</span>
      </span>
      <span>Posts</span>
    </div>
  );
};
