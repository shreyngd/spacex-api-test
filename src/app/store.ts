import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import compareReducer from '../features/compare/compareSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
    reducer: {
        compare: compareReducer,
        search: searchReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
