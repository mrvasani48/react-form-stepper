import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    current_step: 0,
    personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        companyWebsite: '',
        state: '',
        zipCode: ''
    },
    companyDetails: {
        working: [],
        employeeSize: '',
        wfhPolicy: 'true',
    },
    planDetails: {
        startDate: '',
        plans: '',
        prices: true,
        users: 1,
        finale_price: ''
    }
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        SET_NEXT_STEP: (state, action) => {
            state.current_step = action.payload
        },
        SET_PREV_STEP: (state, action) => {
            state.current_step = action.payload
        },
        SET_PERSONAL_INFO: (state, action) => {
            state.personalInfo = action.payload
        },
        SET_COMPANY_DETAILS: (state, action) => {
            state.companyDetails = action.payload
        },
        SET_PLANE_DETAILS: (state, action) => {
            state.planDetails = action.payload
        },
        RESET_STORE: () => initialState
    }
})

export const { SET_NEXT_STEP, SET_PREV_STEP, SET_PERSONAL_INFO, SET_COMPANY_DETAILS, SET_PLANE_DETAILS, RESET_STORE } = authSlice.actions;

export default authSlice.reducer;
