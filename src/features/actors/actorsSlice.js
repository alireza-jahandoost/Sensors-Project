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
  const data = await response.json();
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
    return data;
  }
);

const initialState = {
  datetime: null,
  data: [],
  // status: idle | pending | fulfilled | rejected
  status: "idle",
};

/**
 * structure of each actor:
 * {
 *    actorid: number,
 *    actorname: string,
 *    actorstatus: number,
 *    isLoading: boolean
 * }
 */

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
        const newActors = actors.map((actor) => ({
          ...actor,
          isLoading: false,
        }));
        state.data = newActors;
        state.datetime = datetime;
        state.status = "fulfilled";
      })
      .addCase(fetchActors.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(changeActorStatus.pending, (state, action) => {
        const { actorId } = action.meta.arg;
        const newActors = state.data.map((actor) =>
          actor.actorid === actorId ? { ...actor, isLoading: true } : actor
        );
        state.data = newActors;
      })
      .addCase(changeActorStatus.fulfilled, (state, action) => {
        const receivedActor = action.payload;
        const actorIndex = state.data.findIndex(
          (actor) => actor.actorid === receivedActor.actorid
        );
        state.data[actorIndex].isLoading = false;
        state.data[actorIndex].actorstatus = receivedActor.actorstatus;
      })
      .addCase(changeActorStatus.rejected, (state, action) => {
        const { actorId } = action.meta.arg;
        const newActors = state.data.map((actor) =>
          actor.actorid === actorId ? { ...actor, isLoading: false } : actor
        );
        state.data = newActors;
      });
  },
});

export default actorsSlice.reducer;
