import { createSlice } from "@reduxjs/toolkit"

export const TableSlice = createSlice({
    name: 'Table',
    initialState: {
        changedData:[],
        addNewRowData:{},
        addNewRow:false,
        changedDataFW:[],
        addNewRowDataFW:{},
        addNewRowFW:false,
    },
    reducers: {
        setChangedData: (state, action) => {
            state.changedData = action.payload
        },
        setAddNewRowData: (state, action) => {
            state.addNewRowData = action.payload
        },
        setAddNewRow: (state, action) => {
            state.addNewRow = action.payload
        },
        setChangedDataFW: (state, action) => {
            state.changedDataFW = action.payload
        },
        setAddNewRowDataFW: (state, action) => {
            state.addNewRowDataFW = action.payload
        },
        setAddNewRowFW: (state, action) => {
            state.addNewRowFW = action.payload
        }
  
  
    }
})

export const {setChangedData ,setAddNewRowData,setAddNewRow,setChangedDataFW,setAddNewRowDataFW,setAddNewRowFW} = TableSlice.actions