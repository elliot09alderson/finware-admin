import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_category = createAsyncThunk(
  "category/get_category",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_category = createAsyncThunk(
  "category/delete_category",
  async (categoryId, { rejectWithValue, fulfillWithValue }) => {
    try {
      // console.log(categoryId);
      const { data } = await api.delete(`/category-delete/${categoryId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const category_update = createAsyncThunk(
//   "category/categoryUpdate",
//   async (category, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.post("/category-update", category, {
//         withCredentials: true,
//       });
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const category_image_update = createAsyncThunk(
//   "category/category_image_update",
//   async (
//     { oldImage, newImage, categoryId },
//     { rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const formData = new FormData();
//       formData.append("oldImage", oldImage);
//       formData.append("newImage", newImage);
//       formData.append("categoryId", categoryId);
//       const { data } = await api.post("/category-image-update", formData, {
//         withCredentials: true,
//       });
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const get_one_category = createAsyncThunk(
//   "category/get_one_category",
//   async (categoryId, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.get(`/get-one-category/${categoryId}`, {
//         withCredentials: true,
//       });
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categorys: [],
    totalCategory: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [categoryAdd.pending]: (state, _) => {
      state.loader = true;
    },
    [categoryAdd.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [categoryAdd.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.categorys = [...state.categorys, payload.category];
    },
    [delete_category.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.categorys = [...state.categorys];
    },
    [get_category.fulfilled]: (state, { payload }) => {
      state.totalCategory = payload.totalCategory;
      state.categorys = payload.categorys;
    },
    // [get_one_category.fulfilled]: (state, { payload }) => {
    //   state.singleCategory = payload.singleCategory;
    //   state.categorys = payload.categorys;
    // },
    // [category_update.fulfilled]: (state, { payload }) => {
    //   state.loader = false;
    //   state.categorys = payload.categorys;
    //   state.successMessage = payload.message;
    // },
    // [category_image_update.fulfilled]: (state, { payload }) => {
    //   state.categorys = payload.categorys;
    //   state.successMessage = payload.message;
    // },
  },
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
