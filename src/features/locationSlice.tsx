import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../app/hooks'
import axios from 'axios'
import type { RootState } from '../app/store'

interface DefaultState {
  status: 'start' | 'inProgress' | 'completed' | 'rejected'
  location: {
    name: string
    region: string
  } | null
  current: {
    temp_c: number
    feelslike_c: number
    humidity: number
    wind_kph: number
    pressure_mb: number
    uv: number
    condition: {
      icon: string
      text: string
    }
  } | null
  forecast: {
    forecastday: {
      date: string
      day: {
        avgtemp_c: number
        maxwind_kph: number
        condition: {
          text: string
          icon: string
        }
      }
      astro: {
        sunrise: string
        sunset: string
      }
      hour: {
        temp_c: number
        wind_kph: number
        time: string
        condition: {
          icon: string
          text: string
        }
      }[]
    }[]
  } | null
}

const initialState: DefaultState = {
  status: 'start',
  location: null,
  current: null,
  forecast: null
}

export const fetchLocation = createAppAsyncThunk('location/fetchLocation', async () => {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY} &q=Москва&days=6&aqi=no&alerts=no`)
    return response.data
})

export const fetchSearchLocation = createAppAsyncThunk('location/fetchSearchLocation', async (value: string) => {
  const response = await axios.post(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY} &q=${value}&days=6&aqi=no&alerts=no`)
  return response.data
})

const locationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
        .addCase(fetchLocation.pending, (state) => {state.status = 'inProgress'})
        .addCase(fetchLocation.fulfilled, (state, action) => {
          state.status = 'completed'
          Object.assign(state, action.payload);
        })
        .addCase(fetchLocation.rejected, (state) => {state.status = 'rejected'})
        .addCase(fetchSearchLocation.pending, () => {})
        .addCase(fetchSearchLocation.fulfilled, (state, action) => {
            return {...state, ...action.payload}
        })
        .addCase(fetchSearchLocation.rejected, () => {})
  }
})

export const getLoadingStatus = (state:RootState) => state.defaultLocation.status
export const getDefaultCityData = (state:RootState) => state.defaultLocation.location
export const getDefaultWeatherData = (state:RootState) => state.defaultLocation.current
export const getDefaultForecastData = (state: RootState) => state.defaultLocation.forecast
export const getSelectedDayForecast = (state: RootState, date: {date?:string}) => state.defaultLocation.forecast?.forecastday.filter(item => item.date === date.date)
export default locationSlice.reducer