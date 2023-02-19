import { configureStore, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "@vkontakte/vk-bridge";

interface mainReducerProps {
  user?: UserInfo;
  accountToken?: string;
  aboutPanelEventId?: number;
  profilePanelEventId?: number;
}

const mainReducer = createSlice({
  name: "main",
  initialState: {} as mainReducerProps,
  reducers: {
    set: (
      state,
      action: { type: string; payload: Partial<mainReducerProps> }
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

const store = configureStore({
  reducer: {
    main: mainReducer.reducer,
  },
});

export const { set } = mainReducer.actions;
export default store;
