import { configureStore, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'store',
  initialState: {
    settings: JSON.parse(localStorage.getItem('settings')) || {
      words: true,
      numbers: false,
      symbols: false,
    },
    start: false,
    length: 300,
    darkTheme: false,
    lang: 'en'
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    changeSettings: (state, action) => {
      state.settings = {...state.settings, ...action.payload}
      localStorage.setItem('settings', JSON.stringify(state.settings))
    },
    toggleLanguage: (state) => {
      state.lang = state.lang === 'en' ? 'ru' : 'en';
    },
    toggleStart: (state) => {
      state.start = !state.start
    }
  }
})

export const {toggleLanguage, toggleTheme, changeSettings, toggleStart} = slice.actions

export const store = configureStore({
  reducer: {
    slice: slice.reducer
  },
})
