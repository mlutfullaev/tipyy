import { configureStore, createSlice } from '@reduxjs/toolkit'
const slice = createSlice({
  name: 'store',
  initialState: {
    settings: {
      words: {
        selected: 'EN',
        options: [
          'EN', 'RU', 'AR', 'ES', 'PT'
        ]
      },
      numbers: false,
      symbols: false,
      codes: {
        selected: 'prLang',
        options: ['css', 'prLang', 'html', 'terminal']
      },
      space: {
        selected: 30,
        required: true,
        options: [15, 30, 60, 100]
      }
    },
    start: false,
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
