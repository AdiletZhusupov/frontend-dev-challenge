import { useState, Dispatch, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { createNewPost, updatePost, userId } from "../store/reducers/postsSlice";
import { AppDispatch } from "../store/store";

interface PostFormProps {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  body?: string;
  id?: number;
}

export const PostForm = ({ setShowModal, title, body, id }: PostFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputTitle, setInputTitle] = useState(title || "")
  const [inputBody, setInputBody] = useState(body || "")

  const handleCreateNewPost = () => {
    if (inputTitle && inputBody) {
      const newPost = {
        userId: userId,
        title: inputTitle,
        body: inputBody,
      };
      dispatch(createNewPost(newPost));
      setShowModal(false);
    }
  };

  const handleUpdatePost = () => {
    if (inputTitle && inputBody) {
      const updatedPost = {
        id,
        userId: userId,
        title: inputTitle,
        body: inputBody,
      };
      dispatch(updatePost(updatedPost));
      setShowModal(false);
    }
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if(title && body){
        handleUpdatePost()
    }else{
        handleCreateNewPost()
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {/*body*/}
            <div className="px-6 py-6 lg:px-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Post Title
                  </label>
                  <input
                    type="text"
                    name="post-title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="My Post Title"
                    required
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="body"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Post Body
                  </label>
                  <textarea
                    name="post-body"
                    id="body"
                    rows={10}
                    cols={80}
                    placeholder="My Post"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={inputBody}
                    onChange={(e) => setInputBody(e.target.value)}
                  />
                </div>
                <div className="flex items-center p-6 space-x-2">
                  <button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
