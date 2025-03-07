import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NewPostFormData, Post, UpdatePostRequest } from './post-types';

const newPostFormInitialValues: NewPostFormData = {
  title: 'Blockchain Beyond Bitcoin',
  excerpt: 'Exploring the potential of blockchain in various sectors...',
  category: 1,
  tags: [],
  content: "Blockchain technology, often associated with cryptocurrencies like Bitcoin, has far-reaching applications beyond digital currencies. Its decentralized and secure nature makes it ideal for industries such as finance, healthcare, and supply chain management. In finance, blockchain can streamline transactions, reduce fraud, and improve transparency. In healthcare, it can securely store patient records and enable seamless data sharing between providers. Supply chains can benefit from blockchain's ability to track products from origin to consumer, ensuring authenticity and reducing counterfeiting. As blockchain technology matures, its potential to revolutionize various sectors continues to grow, offering innovative solutions to longstanding challenges.",
  status: 'Published',
  poster_card: null,
  featured: false,
}

export const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    total: 0,
    message: "",
    data: [] as Post[],
    isEditingPost: false,
    currentPost: newPostFormInitialValues,
    currentEdit: { } as UpdatePostRequest
  },
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.data = action.payload;
    },

    setEditingPost: (state, action: PayloadAction<boolean>) => {
      state.isEditingPost = action.payload;
    },

    setCurrentPost: (state, action: PayloadAction<NewPostFormData>) => {
      state.currentPost = action.payload;
    },

    setCurrentEdit: (state, action: PayloadAction<UpdatePostRequest>) => {
      state.currentEdit = action.payload;
    },

    resetNewPostFormValues: (state) => {
      state.currentPost = newPostFormInitialValues;
    }
  },
});

export const { setPosts, setEditingPost, setCurrentPost, setCurrentEdit, resetNewPostFormValues } = postSlice.actions;

export const selectAllPosts = (state: { post: ReturnType<typeof postSlice.reducer> }) => state.post.data;
