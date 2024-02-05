import { configureStore, createSlice } from '@reduxjs/toolkit'
// JSON.parse(localStorage.getItem('settings')) ||
const slice = createSlice({
  name: 'store',
  initialState: {
    settings: {
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
      selected: 'en',
      required: true,
      options: [
        'en', 'ru', 'es', 'pt', 'zh'
      ]
    },
    words: {
      selected: 30,
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
      state.language.selected = action.payload
    },
    changeWords: (state, action) => {
      state.words.selected = action.payload
    },
    toggleStart: (state) => {
      state.start = !state.start
    }
  }
})

export const {toggleLanguage, changeLanguage, changeWords, toggleTheme, changeSettings, toggleStart} = slice.actions

export const store = configureStore({
  reducer: {
    slice: slice.reducer
  },
})
