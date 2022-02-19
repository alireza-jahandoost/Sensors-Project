import { configureStore } from "@reduxjs/toolkit";
import sensorsReducer from "../features/sensors/sensorsSlice";
import actorsReducer from "../features/actors/actorsSlice";

export const store = configureStore({
  reducer: {
    sensors: sensorsReducer,
    actors: actorsReducer,
  },
});
