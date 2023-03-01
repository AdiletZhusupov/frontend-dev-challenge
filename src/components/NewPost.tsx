import { useState } from "react";
import { PostForm } from './PostForm';

export const NewPost = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
      >
        <span>+</span>
        <span className="ml-3">New Post</span>
      </button>
      {showModal ? (
        <PostForm
        setShowModal={setShowModal}
        />
      ) : null}
    </>
  );
};
