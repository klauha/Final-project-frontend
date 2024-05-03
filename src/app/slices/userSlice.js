// importamos la funcion para crear slice de la libreria toolkit
import { createSlice } from '@reduxjs/toolkit';


// creamos el slice
export const userSlice = createSlice(
    {
        name: 'user',
        initialState: {
            credentials: {

            }
        },
        reducers: {
            loginRdx: (state, action) => {
                return {
                    ...state,
                    ...action.payload
                }
            },
            logoutRdx: (state, action) => {
                return {
                    ...state,
                    ...action.payload
                }
            }
        }

    }
);

export const { loginRdx, logoutRdx } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;