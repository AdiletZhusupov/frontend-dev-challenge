import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IComment, IPost, ISinglePostInfo } from "../../types/types";

const endpointAllPosts = "https://jsonplaceholder.typicode.com/posts/";

export const userId = 1;
export let maxNumPosts = 0;
let counter = 0;

interface IInitialState {
  isLoading: boolean;
  error: string;
  posts: IPost[] | null;
  singlePost: IPost | undefined;
  comments: IComment[] | null;
  ReadPosts: number[];
}

const initialState: IInitialState = {
  isLoading: false,
  error: "",
  posts: null,
  singlePost: undefined,
  comments: null,
  ReadPosts: [],
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, ThunkAPI) => {
    try {
      const resp = await axios.get<IPost[]>(endpointAllPosts);
      return resp.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const fetchSinglePost = createAsyncThunk(
  "singlePost/fetchOne",
  async (postId: number, ThunkAPI) => {
    try {
      const getPost = axios.get(`${endpointAllPosts}${postId}`);
      const getComments = axios.get(`${endpointAllPosts}${postId}/comments`);
      const [singlePostData, commentsData] = await axios.all([
        getPost,
        getComments,
      ]);
      return { post: singlePostData.data, comments: commentsData.data };
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const deletePost = createAsyncThunk(
  "deleteSinglePost/deleteOne",
  async (postId: number, ThunkAPI) => {
    try {
      await axios.delete<IPost>(`${endpointAllPosts}${postId}`);
      return postId;
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const createNewPost = createAsyncThunk(
  "createNewPost/createOne",
  async (post: IPost, ThunkAPI) => {
    try {
      const resp = await axios.post<IPost>(`${endpointAllPosts}`);
      const newId = resp.data.id! + counter;
      return { id: newId, ...post };
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const updatePost = createAsyncThunk(
  "updatePost/updateOne",
  async (post: IPost, ThunkAPI) => {
    try {
      if(post.id! < maxNumPosts){
        await axios.put<IPost>(`${endpointAllPosts}${post.id}`);
      }
      return post;
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    displayStaticPost: (state, action: PayloadAction<number>) => {
      state.singlePost = state.posts!.find(
        (post) => post.id === action.payload
      );
      state.comments = null;
    },
  },
  extraReducers: (build) => {
    // fetching All Posts
    build.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<IPost[]>) => {
        state.isLoading = false;
        maxNumPosts = action.payload.length;
        state.posts = action.payload.filter((post) => {
          return post.userId === userId;
        });
      }
    );
    build.addCase(fetchPosts.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // fetching Single Post and Its Comments
    build.addCase(fetchSinglePost.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      fetchSinglePost.fulfilled,
      (state, action: PayloadAction<ISinglePostInfo>) => {
        state.isLoading = false;
        if (state.ReadPosts.includes(action.payload.post.id!)) {
          state.singlePost = state.posts!.find((post) => {
            return post.id === action.payload.post.id;
          });
        } else {
          state.singlePost = action.payload.post;
          state.ReadPosts.push(action.payload.post.id!);
        }
        state.comments = action.payload.comments;
      }
    );
    build.addCase(
      fetchSinglePost.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Deleting Single Post
    build.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      deletePost.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.posts = state.posts!.filter((post) => {
          return post.id !== action.payload;
        });
        state.singlePost = undefined;
      }
    );
    build.addCase(deletePost.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Creating New Post
    build.addCase(createNewPost.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      createNewPost.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.isLoading = false;
        state.posts!.push(action.payload);
        counter++;
      }
    );
    build.addCase(
      createNewPost.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );

    // Updating Post
    build.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      updatePost.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.isLoading = false;
        const index = state.posts!.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts?.splice(index, 1, action.payload);
        state.singlePost = action.payload;
      }
    );
    build.addCase(updatePost.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default postsSlice.reducer;
export const {displayStaticPost} = postsSlice.actions;