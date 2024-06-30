import { createSlice } from '@reduxjs/toolkit';

const visibilitySlice = createSlice({
    name: 'visibility',
    initialState: {
        showInvoiceList: true,
    },
    reducers: {
        showForm: (state) => {
            state.showInvoiceList = false;
        },
        showInvoiceList: (state) => {
            state.showInvoiceList = true;
        },
    },
});

export const { showForm, showInvoiceList } = visibilitySlice.actions;

export default visibilitySlice.reducer;
