import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MyProfileState {
  name: string | null;
  age: number | null;
  gender: string | null;
  nickname: string | null;
  imageUrl: string | File | null;
  description: string | null;
  baseLocation: string | null;
  temperature: number | null;
  likes: number | null;
  dislikes: number | null;
}

const initialState: MyProfileState = {
  name: null,
  age: null,
  gender: null,
  nickname: null,
  imageUrl: null,
  description: null,
  baseLocation: null,
  temperature: null,
  likes: null,
  dislikes: null,
};

const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    setMyProfile(state, action: PayloadAction<Partial<MyProfileState>>) {
      return { ...state, ...action.payload };
    },
    clearMyProfile() {
      return initialState;
    },
  },
});

export const { setMyProfile, clearMyProfile } = myProfileSlice.actions;
export default myProfileSlice.reducer;
