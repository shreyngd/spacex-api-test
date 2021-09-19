import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LaunchHistory } from '../../components/LaunchesListContainer';

export interface CompareState {
    compareData: Record<string, LaunchHistory>;
    maximized: boolean;
    compareCount: number;
}

const initialState: CompareState = {
    compareData: {},
    maximized: false,
    compareCount: 0,
};

export const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addToComapare: (
            state: CompareState,
            action: PayloadAction<LaunchHistory>,
        ) => {
            if (!state.compareData[action.payload.id]) {
                state.compareCount += 1;
            }
            state.compareData[action.payload.id] = action.payload;
        },
        deleteFromCompare: (state, action: PayloadAction<string>) => {
            delete state.compareData[action.payload];
            state.compareCount -= 1;
        },
        allClear: (state) => {
            state.maximized = false;
            state.compareData = {};
            state.compareCount = 0;
        },
        openModal: (state) => {
            state.maximized = true;
        },
        closeModal: (state) => {
            state.maximized = false;
        },
    },
});

export const {
    addToComapare,
    deleteFromCompare,
    allClear,
    openModal,
    closeModal,
} = compareSlice.actions;

export const selectCompareData = (
    state: RootState,
): Record<string, LaunchHistory> => state.compare.compareData;

export const selectCompareState = (state: RootState): boolean =>
    state.compare.maximized;

export const selectCompareCount = (state: RootState): number =>
    state.compare.compareCount;

export default compareSlice.reducer;
