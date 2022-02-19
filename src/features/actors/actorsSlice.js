import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { actors as actorsRoutes } from "../../api/routes";

// Thunks
export const fetchActors = createAsyncThunk("actors/fetchActors", async () => {
  const response = await fetch(actorsRoutes.index.url, {
    method: actorsRoutes.index.method,
    headers: {
      accept: "application/json",
    },
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
});

export const changeActorStatus = createAsyncThunk(
  "actors/changeActorStatus",
  async ({ actorId, actorStatus }) => {
    const response = await fetch(actorsRoutes.changeStatus.url, {
      method: actorsRoutes.changeStatus.method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        actorid: actorId,
        actorstatus: actorStatus,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);

const initialState = {
  datetime: null,
  data: [],
  // status: idle | pending | fulfilled | rejected
  status: "idle",
};

// Slice
const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActors.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        const { actors, datetime } = action.payload;
        state.data = actors;
        state.datetime = datetime;
        state.status = "fulfilled";
      })
      .addCase(fetchActors.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default actorsSlice.reducer;
