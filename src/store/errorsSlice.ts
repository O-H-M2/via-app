import {RootState} from './index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Device} from 'src/types/types';

export type KeyboardAPIError = {
  timestamp: string;
  commandName: string;
  commandBytes: number[];
  responseBytes: number[];
  device: Device;
};

export type AppError = {
  timestamp: string;
  error: string;
  vendorId: number;
  productId: number;
  productName: string;
};

type ErrorsState = {
  keyboardAPIErrors: KeyboardAPIError[];
  appErrors: AppError[];
};

const initialState: ErrorsState = {
  keyboardAPIErrors: [],
  appErrors: [],
};

export const getErrorTimestamp = () => {
  const now = new Date();
  return `${now.toLocaleTimeString([], {hour12: false})}.${now
    .getMilliseconds()
    .toString()
    .padStart(3, '0')}`;
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    logAppError: (
      state,
      action: PayloadAction<Omit<AppError, 'timestamp'>>,
    ) => {
      state.appErrors.push({...action.payload, timestamp: getErrorTimestamp()});
    },
    logKeyboardAPIError: (
      state,
      action: PayloadAction<Omit<KeyboardAPIError, 'timestamp'>>,
    ) => {
      state.keyboardAPIErrors.push({
        ...action.payload,
        timestamp: getErrorTimestamp(),
      });
    },
    clearAppErrors: (state) => {
      state.appErrors = [];
    },
    clearKeyboardAPIErrors: (state) => {
      state.keyboardAPIErrors = [];
    },
  },
});

export const {
  logKeyboardAPIError,
  clearKeyboardAPIErrors,
  logAppError,
  clearAppErrors,
} = errorsSlice.actions;

export default errorsSlice.reducer;

export const getAppErrors = (state: RootState) => state.errors.appErrors;
export const getKeyboardAPIErrors = (state: RootState) =>
  state.errors.keyboardAPIErrors;
