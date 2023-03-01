import { useState } from "react";
import { useSelector } from "react-redux";
import { SlPencil } from "react-icons/sl";
import { RootState } from "../store/store";
import { PostForm } from "./PostForm";

export const UpdatePost = () => {
    const { singlePost } = useSelector(
      (state: RootState) => state.posts
    );
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center ml-4"
      >
        <SlPencil />
        <span className="ml-3">Update</span>
      </button>
      {showModal ? (
        <PostForm
          setShowModal={setShowModal}
          title={singlePost?.title}
          body={singlePost?.body}
          id={singlePost?.id}
        />
      ) : null}
    </>
  );
};
