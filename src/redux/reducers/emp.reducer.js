import { createSlice } from "@reduxjs/toolkit";
import { companyDetailsInitialState, personalInfoInitialState, planDetailsInitialValue } from "../../utils/constant";

const initialState = {
    current_step:0,
    personalInfo: personalInfoInitialState,
    companyDetails: companyDetailsInitialState,
    planDetails: planDetailsInitialValue
}
const empDetailsSlice = createSlice({
    name: 'emp',
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

export const { SET_NEXT_STEP, SET_PREV_STEP, SET_PERSONAL_INFO, SET_COMPANY_DETAILS, SET_PLANE_DETAILS, RESET_STORE } = empDetailsSlice.actions;

export default empDetailsSlice.reducer;
