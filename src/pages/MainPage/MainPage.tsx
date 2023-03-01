import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../store/reducers/postsSlice";
import { AppDispatch, RootState } from "../../store/store";

const MainPage = () => {
  const { isLoading, posts } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts());
    }
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {posts?.map((post) => {
          return (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {post.body.substring(0, 50).concat("...")}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;