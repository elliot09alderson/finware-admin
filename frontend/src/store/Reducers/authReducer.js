import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import api from "../../api/api";

export const admin_send_mail = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_login = createAsyncThunk(
  "auth/verify_otp",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/verify-admin-otp", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const seller_login = createAsyncThunk(
  "auth/verify_otp",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/verify-otp", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const seller_send_mail = createAsyncThunk(
  "auth/seller-login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/logout", { withCredentials: true });
      localStorage.removeItem("accessToken");
      if (role === "admin") {
        navigate("/admin/login");
      } else {
        navigate("/login");
      }

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (state, { rejectWithValue, fulfillWithValue }) => {
    console.log(state, "state..");
    try {
      const { data } = await api.post("/seller-register", state, {
        withCredentials: true,
      });
      console.log(data, "seller register data");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forward_email_data = createAsyncThunk(
  "auth/seller_email_forward",
  async (email, { rejectWithValue, fulfillWithValue }) => {
    try {
      return fulfillWithValue(email);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_kyc_file_upload = createAsyncThunk(
  "auth/seller_kyc_upload",
  async (files, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-document-upload", files, {
        withCredentials: true,
      });
      console.log(data, "data..");
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_kyc_data = createAsyncThunk(
  "auth/seller_kyc_data",
  async (kycData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-kyc-details", kycData, {
        withCredentials: true,
      });
      console.log(data, "data..");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_image_upload = createAsyncThunk(
  "auth/profile_image_upload",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-image-upload", image, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_info_add = createAsyncThunk(
  "auth/profile_info_add",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-info-add", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const returnRole = (token) => {
  if (token) {
    console.log(token);
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    messageClear(state, _) {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      // (seller_login.pending]: (state, _) => {
      //   state.loader = true;
      // })
      // (seller_login.rejected]: (state, { payload }) => {
      //   state.loader = false;
      //   state.errorMessage = payload.error;
      // })
      // (seller_login.fulfilled]: (state, { payload }) => {
      //   state.loader = false;
      //   state.successMessage = payload.message;
      //   state.token = payload.token;
      //   state.role = returnRole(payload.token);
      // })
      .addCase(seller_send_mail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(seller_send_mail.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(admin_send_mail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(admin_send_mail.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_register.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(seller_kyc_data.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(seller_kyc_data.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_kyc_data.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(seller_kyc_file_upload.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(seller_kyc_file_upload.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_kyc_file_upload.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      .addCase(forward_email_data.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(forward_email_data.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(forward_email_data.fulfilled, (state, { payload }) => {
        state.loader = false;
        console.log(payload, "payload in forward email");
        state.email = payload;
      })
      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.role = payload.userInfo.role;
      })
      .addCase(profile_image_upload.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      })
      .addCase(profile_info_add.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(profile_info_add.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      });
  },
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
