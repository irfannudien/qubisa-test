import { homeAPI } from "@/service/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface HomeState {
  currentWebinars: any[];
  topBanners: any[];
  menus: any[];
  categories: any[];
  featureVideo: any[];
  proudlyFeaturedIn: any[];
  other: any[];
  searchPopulerKeyword: string[];
  suggestionContentTabs: {} | null;
  sections: any[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  currentWebinars: [],
  topBanners: [],
  menus: [],
  categories: [],
  featureVideo: [],
  proudlyFeaturedIn: [],
  other: [],
  searchPopulerKeyword: [],
  suggestionContentTabs: null,
  sections: [],
  loading: false,
  error: null,
};

export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await homeAPI.getHomeData();
      return response.result;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil data"
      );
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWebinars = action.payload.currentWebinars || [];
        state.topBanners = action.payload.topBanners || [];
        state.menus = action.payload.menus || [];
        state.categories = action.payload.categories || [];
        state.featureVideo = action.payload.featureVideo || [];
        state.proudlyFeaturedIn = action.payload.proudlyFeaturedIn || [];
        state.other = action.payload.other || [];
        state.searchPopulerKeyword = action.payload.searchPopulerKeyword || [];
        state.suggestionContentTabs =
          action.payload.suggestionContentTabs || [];
        state.sections = action.payload.sections || [];
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
