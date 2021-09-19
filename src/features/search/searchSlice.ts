import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface SearchState {
    value: string;
    type: 'mission_name' | 'rocket_name';
}

const initialState: SearchState = {
    value: '',
    type: 'mission_name',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeSearch: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        changeType: (
            state,
            action: PayloadAction<'mission_name' | 'rocket_name'>,
        ) => {
            state.type = action.payload;
        },
    },
});

export const { changeSearch, changeType } = searchSlice.actions;

export const selectSearch = (state: RootState): string => state.search.value;
export const selectSearchType = (
    state: RootState,
): 'mission_name' | 'rocket_name' => state.search.type;

export default searchSlice.reducer;
