import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {IUser} from '../../types/types'

// Define a type for the slice state
interface UserState {
    user: IUser | null;
    isAuth: boolean;
    isAdmin: boolean; // Добавляем поле isAdmin
}

// Define the initial state using that type
const initialState: UserState = {
    user: null,
    isAuth: false,
    isAdmin: false, // Инициализируем поле isAdmin
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true;
            state.isAdmin = action.payload.role === 'admin'; // Проверяем роль пользователя
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
            state.isAdmin = false; // Сбрасываем поле isAdmin при выходе
        },
    },
});

export const {login, logout} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
