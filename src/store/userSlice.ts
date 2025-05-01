import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Company {
  id: number;
  name: string;
  location: string;
  website: string;
  cnpj: string;
}

interface UserState {
  id: number | null;
  name: string;
  email: string;
  isLogged: boolean;
  companies: Company[];
}

const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  isLogged: false,
  companies: [],
};





export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ id: number; name: string; email: string;  }>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLogged = true;
    },
    logout(state) {
      state.name = '';
      state.email = '';
      state.isLogged = false;
      state.companies = [];
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;