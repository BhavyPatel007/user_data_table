import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  getLoading: false,
  addUserLoading: false,
};

export const fetchAllUser = createAsyncThunk("user/fetchAllUser", async () => {
  try {
    const res = await fetch(process.env.REACT_APP_API_URL).then((data) =>
      data.json()
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const addUser = createAsyncThunk("user/addUser", async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(process.env.REACT_APP_API_URL, requestOptions)
    .then(() => response.data)
    .catch((error) => error);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.getLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state) => {
        state.getLoading = false;
      })

      .addCase(addUser.pending, (state) => {
        state.addUserLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addUserLoading = false;
        state.userData = [...state.userData, action.payload];
      })
      .addCase(addUser.rejected, (state, action) => {
        state.addUserLoading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
