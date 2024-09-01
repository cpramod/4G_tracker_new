import { createSlice } from "@reduxjs/toolkit"

export const MenuSlice = createSlice({
    name: 'Menu',
    initialState: {
        minimizedSidebar:true,
    },
    reducers: {
        setOpenCloseMenu: (state, action) => {
            state.minimizedSidebar = !state.minimizedSidebar
        },
  
    }
})

export const {setOpenCloseMenu } = MenuSlice.actions