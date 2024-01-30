import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const sub_Category_add = createAsyncThunk(
  "subcategory/sub_category_add",
  async (
    { name, image, categoryId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("categoryId", categoryId);

      const { data } = await api.post("sub-category-add", formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_sub_category = createAsyncThunk(
  "subcategory/get_sub_category",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/sub_category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      // console.log(data, "sub category get..");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_sub_category = createAsyncThunk(
  "subcategory/delete_sub_category",
  async (subCategoryId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/sub-category-delete/${subCategoryId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sub_category_update = createAsyncThunk(
  "subcategory/sub-category-update",
  async (subCategory, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/sub-category-update", subCategory, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sub_category_image_update = createAsyncThunk(
  "subcategory/sub_category_image_update",
  async (
    { oldImage, newImage, subCategoryId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("categoryId", subCategoryId);
      const { data } = await api.post("/sub-category-image-update", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_selected_sub_category = createAsyncThunk(
  "subcategory/get_selected_sub_category",
  async (categoryId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/get_selected_sub_category",
        { categoryId },
        {
          withCredentials: true,
        }
      );
      console.log("Data from Sub Category Rducer =  ", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_one_sub_category = createAsyncThunk(
  "subcategory/get-one-subCategory",
  async (subCategoryId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-one-subCategor/${subCategoryId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const subCategoryReducer = createSlice({
  name: "subcategory",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    subcategorys: [],
    selectedSubCategories: [],
    totalsubCategory: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [sub_Category_add.pending]: (state, _) => {
      state.loader = true;
    },
    [sub_Category_add.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [sub_Category_add.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.subcategorys = [...state.subcategorys, payload.subcategorys];
    },
    [get_selected_sub_category.pending]: (state, _) => {
      state.loader = true;
    },
    [get_selected_sub_category.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [get_selected_sub_category.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.selectedSubCategories = [
        ...state.selectedSubCategories,
        payload.subCategorys,
      ];
    },
    [get_sub_category.fulfilled]: (state, { payload }) => {
      state.totalSubCategory = payload.totalSubCategory;
      state.subCategorys = payload.subCategorys;
    },
    [delete_sub_category.fulfilled]: (state, { payload }) => {
      state.subCategorys = [...state.subCategorys];
      state.successMessage = payload.message;
    },
    [get_one_sub_category.fulfilled]: (state, { payload }) => {
      state.singleSubcategory = payload.singleSubCategory;
      state.subCategories = payload.subCategories;
    },
    [sub_category_update.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.subcategorys = payload.subcategorys;
      state.successMessage = payload.message;
    },
    [sub_category_image_update.fulfilled]: (state, { payload }) => {
      state.subcategorys = payload.subcategorys;
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = subCategoryReducer.actions;
export default subCategoryReducer.reducer;
