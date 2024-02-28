import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const about = axios.get("http://my-portfolio-q1erag4bk-gauravydavs-projects.vercel.app/");
  const education = axios.get("http://localhost:5000/education");
  const projects = axios.get("http://localhost:5000/project");
  const experience = axios.get("http://localhost:5000/experience");

  const [aboutRes, educationRes, projectsRes, experienceRes] =
    await Promise.all([about, education, projects, experience]);

  return {
    about: aboutRes.data,
    education: educationRes.data,
    projects: projectsRes.data,
    experience: experienceRes.data,
  };
});

export const checkLogin = createAsyncThunk("data/checkLogin", async () => {
  const token = localStorage.getItem("tokenStore");
  if (token) {
    const verified = await axios.get("http://localhost:5000/user/verify", {
      headers: { Authorization: token },
    });
    return verified.data;
  }
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    about: [],
    education: [],
    projects: [],
    experience: [],
    isLogin: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUserSuccess: (state) => {
      state.isLogin = false;

      // console.log("isLogin after logout:", state.isLogin);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "idle";
        state.about = action.payload.about;
        state.education = action.payload.education;
        state.projects = action.payload.projects;
        state.experience = action.payload.experience;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLogin = action.payload;
      });
  },
});

export const { logoutUserSuccess } = dataSlice.actions;

export default dataSlice.reducer;
