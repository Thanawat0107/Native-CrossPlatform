import { Group } from "../../../@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface groupState {
  groups: Group[];
}

const initialState: groupState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },

    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
    },

    removeGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },

    updateGroup: (state, action: PayloadAction<Group>) => {
      const index = state.groups.findIndex(
        (group) => group.id === action.payload.id
      );
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
  },
});

export const { setGroups } = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
