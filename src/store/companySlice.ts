import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../types/location';

export interface Company {
  id: number ;
  name: string;
  cnpj: string;
  website: string;
  userId: number;
  locations: Location[];
}

interface CompanyState {
  companies: Company[];
}

const initialState: CompanyState = {
  companies: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<Company[]>) {
      state.companies = action.payload;
    },
    addCompany(state, action: PayloadAction<Company>) {
      state.companies.push(action.payload);
    },
    updateCompany(state, action: PayloadAction<Company>) {
      const index = state.companies.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    },
    deleteCompany(state, action: PayloadAction<number>) {
      state.companies = state.companies.filter(c => c.id !== action.payload);
    },
  },
});




export const {
  setCompanies,
  addCompany,
  updateCompany,
  deleteCompany
} = companySlice.actions;

export default companySlice.reducer;