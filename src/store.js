import { configureStore, createSlice } from '@reduxjs/toolkit'
// JSON.parse(localStorage.getItem('settings')) ||
const slice = createSlice({
  name: 'store',
  initialState: {
    customTyping: [],
    settings: JSON.parse(localStorage.getItem('settings')) || {
      letter: {
        selected: 'chars',
        options: [
          'chars', 'words', 'mixed'
        ]
      },
      numbers: false,
      symbols: false,
      codes: {
        selected: false,
        options: ['css', 'prLang', 'html', 'terminal']
      },
    },
    language: {
      selected: localStorage.getItem('language') || 'en',
      required: true,
      options: [
        'en', 'ru', 'es', 'pt', 'zh'
      ]
    },
    words: {
      selected: JSON.parse(localStorage.getItem('words')) || 30,
      required: true,
      options: [15, 30, 60, 100]
    },
    start: false,
    darkTheme: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    changeSettings: (state, action) => {
      state.settings = {...state.settings, ...action.payload}
      localStorage.setItem('settings', JSON.stringify(state.settings))
    },
    changeLanguage: (state, action) => {
      localStorage.setItem('language', action.payload)
      state.language.selected = action.payload
    },
    changeWords: (state, action) => {
      localStorage.setItem('words', action.payload)
      state.words.selected = action.payload
    },
    toggleStart: (state) => {
      state.start = !state.start
    },
    addCustom: (state, action) => {
      state.customTyping = action.payload
    }
  }
})

export const {toggleLanguage, changeLanguage, changeWords, toggleTheme, changeSettings, toggleStart, addCustom} = slice.actions

export const store = configureStore({
  reducer: {
    slice: slice.reducer
  },
})
