import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sensors as sensorsRoutes } from "../../api/routes";

// Thunks
export const fetchSensors = createAsyncThunk(
  "sensors/fetchSensors",
  async () => {
    const response = await fetch(sensorsRoutes.index.url, {
      method: sensorsRoutes.index.method,
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
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
const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensors.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSensors.fulfilled, (state, action) => {
        const { datetime, sensors } = action.payload;
        state.datetime = datetime;
        state.data = sensors;
        state.status = "fulfilled";
      })
      .addCase(fetchSensors.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

// Selectors
export const sensorsDataSelector = (state) => state.sensors.data;
export const sensorsStatusSelector = (state) => state.sensors.status;
export const sensorsDateTimeSelector = (state) => state.sensors.datetime;

export default sensorsSlice.reducer;
