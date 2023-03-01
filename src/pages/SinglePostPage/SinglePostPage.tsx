import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSinglePost, maxNumPosts } from "../../store/reducers/postsSlice";
import { Comment } from "../../components/Comment";
import { DeletePost } from "../../components/DeletePost";
import { NewPost } from "../../components/NewPost";
import { UpdatePost } from "../../components/UpdatePost";
import { displayStaticPost } from "../../store/reducers/postsSlice";

const SinglePostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { singlePost, comments, isLoading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (+id! < maxNumPosts) {
      dispatch(fetchSinglePost(+id!));
    } else {
      dispatch(displayStaticPost(+id!));
    }
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-2xl">
        <div className="flex justify-between py-6">
          <Link
            to="/"
            className="flex justify-center items-center hover:text-blue-700"
          >
            <MdArrowBack />
            <span className="ml-3">Main Page</span>
          </Link>
          <NewPost />
        </div>
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {singlePost?.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {singlePost?.body}
          </p>
        </div>

        <div className="p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Comments
            </h5>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              Emails
            </span>
          </div>
          {comments ? (
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {comments?.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-red-500">
              Oooops!!! Terribly Sorry, but No Comments have been found!
            </div>
          )}
        </div>

        <div className="flex mt-4">
          <div className="flex ml-auto">
            <DeletePost postId={id!} />
            <UpdatePost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;