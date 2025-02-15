import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Herb } from "../../../@types/herb";
interface herbState {
  herbs: Herb[]; // สำหรับจัดเก็บรายการสมุนไพรทั้งหมด
  selectedHerb?: Herb; // สำหรับจัดเก็บสมุนไพรที่ถูกเลือก
  searchQuery: string; // สำหรับค้นหาสมุนไพร
  filteredHerbs: Herb[]; // สำหรับเก็บผลลัพธ์ที่ค้นหา
}

const initialState: herbState = {
  herbs: [],
  searchQuery: "",
  filteredHerbs: [],
};

export const herbsSlice = createSlice({
  name: "herbs",
  initialState: initialState,
  reducers: {
    setHerbs: (state, action: PayloadAction<Herb[]>) => {
      state.herbs = action.payload;
    },

    addHerb: (state, action: PayloadAction<Herb>) => {
      state.herbs.push(action.payload);
    },

    updateHerb: (state, action: PayloadAction<Herb>) => {
      const index = state.herbs.findIndex(
        (herb) => herb.id === action.payload.id
      );
      if (index !== -1) {
        state.herbs[index] = action.payload;
      } else {
        console.warn(`Herb with ID ${action.payload.id} not found.`);
      }
    },

    removeHerb: (state, action: PayloadAction<number>) => {
      state.herbs = state.herbs.filter((herb) => herb.id !== action.payload);
    },

    selectHerb: (state, action: PayloadAction<number>) => {
      state.selectedHerb = state.herbs.find(
        (herb) => herb.id === action.payload
      );
    },
    
    searchHerb: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredHerbs = state.herbs.filter((herb) =>
        herb.scientific_name?.toLowerCase().includes(action.payload.toLowerCase()) ||
        herb.common_names?.some((name) =>
          name.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
    },
    
  },
});

export const {
  setHerbs,
  addHerb,
  updateHerb,
  removeHerb,
  selectHerb,
  searchHerb,
} = herbsSlice.actions;

export const herbsReducer = herbsSlice.reducer;
