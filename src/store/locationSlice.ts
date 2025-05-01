import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../types/location';

interface LocationState {
  locations: Location[];
}

const initialState: LocationState = {
  locations: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload);
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      const index = state.locations.findIndex(l => l.id === action.payload.id);
      if (index !== -1) state.locations[index] = action.payload;
    },
    deleteLocation: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter(l => l.id !== action.payload);
    },
  },
});

export const { setLocations, addLocation, updateLocation, deleteLocation } = locationSlice.actions;
export default locationSlice.reducer;