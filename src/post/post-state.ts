import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NewPostFormData } from './post-types';

const newPostFormInitialValues: NewPostFormData = {
  title: 'Blockchain Beyond Bitcoin',
  excerpt: 'Exploring the potential of blockchain in various sectors...',
  category: 1,
  tags: 'java',
  content: "Blockchain technology, often associated with cryptocurrencies like Bitcoin, has far-reaching applications beyond digital currencies. Its decentralized and secure nature makes it ideal for industries such as finance, healthcare, and supply chain management. In finance, blockchain can streamline transactions, reduce fraud, and improve transparency. In healthcare, it can securely store patient records and enable seamless data sharing between providers. Supply chains can benefit from blockchain's ability to track products from origin to consumer, ensuring authenticity and reducing counterfeiting. As blockchain technology matures, its potential to revolutionize various sectors continues to grow, offering innovative solutions to longstanding challenges.",
  status: 'Published',
  poster_card: null,
  featured: false,
}

export const postStateSlice = createSlice({
  name: 'postStateSlice',
  initialState: {
    formState: newPostFormInitialValues,
  },
  reducers: {

    setCurrentFormState: (state, action: PayloadAction<NewPostFormData>) => {
      state.formState = action.payload;
    },

    resetFormState: (state) => {
      state.formState = newPostFormInitialValues;
    }
  },
});

export const { setCurrentFormState, resetFormState } = postStateSlice.actions;
