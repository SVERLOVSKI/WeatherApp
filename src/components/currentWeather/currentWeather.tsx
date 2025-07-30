import { useAppSelector } from '../../app/hooks'
import { getDefaultCityData, getDefaultWeatherData, getDefaultForecastData } from '../../features/locationSlice'
import SunriseIconBlack from './imgs/sunrise/sunrise_black.svg'
import SunriseIconWhite from './imgs/sunrise/sunrise_white.svg'
import SunsetIconBlack from './imgs/sunset/sunset_black.svg'
import SunsetIconWhite from './imgs/sunset/sunset_white.svg'
import HumidityIconBlack from './imgs/humidity/humidity_black.svg'
import HumidityIconWhite from './imgs/humidity/humidity_white.svg'
import WindIconBlack from './imgs/wind/wind_black.svg'
import WindIconWhite from './imgs/wind/wind_white.svg'
import PressureIconBlack from './imgs/pressure/pressure_black.svg'
import PressureIconWhite from './imgs/pressure/pressure_white.svg'
import UVIconBlack from './imgs/uv/uv_black.svg'
import UVIconWhite from './imgs/uv/uv_white.svg'
import './currentWeather.css'

interface CurrentWeatherProps {
    darkTheme: boolean
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ darkTheme }) => {
    const defaultCityData = useAppSelector(getDefaultCityData)
    const defaultWeatherData = useAppSelector(getDefaultWeatherData)
    const defaultForecastData = useAppSelector(getDefaultForecastData)

    return (
        <div className="current-weather">
            <div className="location">
                <h1 className="city_name">{defaultCityData?.name}</h1>
                <p className="region">{defaultCityData?.region}</p>
            </div>
            <div className="current-weather-bar">
                <div className="temperature-block">
                    <p className="temperature">{defaultWeatherData?.temp_c} °C</p>
                    <p className="temperature-feelslike">Feels like: <span className='feelslike-value'>{defaultWeatherData?.feelslike_c} °C</span></p>
                    <div className="sun-information">
                        <div className="sunrise">
                            {darkTheme ? <img src={SunriseIconWhite} alt="" className='forecast-icon' /> : <img src={SunriseIconBlack} alt="" className='forecast-icon' />}
                            <div className="sunrise-information">
                                <h3 className="sunrise-title">Sunrise</h3>
                                <p className="sunrise-time">{defaultForecastData?.forecastday[0].astro.sunrise}</p>
                            </div>
                        </div>
                        <div className="sunset">
                            {darkTheme ? <img src={SunsetIconWhite} alt="" className='forecast-icon' /> : <img src={SunsetIconBlack} alt="" className='forecast-icon' />}
                            <div className="sunset-information">
                                <h3 className="sunset-title">Sunset</h3>
                                <p className="sunrise-time">{defaultForecastData?.forecastday[0].astro.sunset}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sky">
                    <img src={defaultWeatherData?.condition.icon} alt="" className='sky-icon' />
                    <h2 className='sky-title'>{defaultWeatherData?.condition.text}</h2>
                </div>
                <div className="additional-information">
                    <div className="humidity">
                        {darkTheme ? <img src={HumidityIconWhite} alt="" className='forecast-icon info' /> : <img src={HumidityIconBlack} alt="" className='forecast-icon' />}
                        <p className="humidity-value">{defaultWeatherData?.humidity} %</p>
                        <h3 className="humidity-title">Humidity</h3>
                    </div>
                    <div className="wind">
                        {darkTheme ? <img src={WindIconWhite} alt="" className='forecast-icon info' /> : <img src={WindIconBlack} alt="" className='forecast-icon' />}
                        <p className="wind-value">{defaultWeatherData?.wind_kph} km/h</p>
                        <h3 className="wind-title">Wind Speed</h3>
                    </div>
                    <div className="pressure">
                        {darkTheme ? <img src={PressureIconWhite} alt="" className='forecast-icon info' /> : <img src={PressureIconBlack} alt="" className='forecast-icon' />}
                        <p className="pressure-value">{defaultWeatherData?.pressure_mb} hPa</p>
                        <h3 className="pressure-title">Pressure</h3>
                    </div>
                    <div className="uv">
                        {darkTheme ? <img src={UVIconWhite} alt="" className='forecast-icon info' /> : <img src={UVIconBlack} alt="" className='forecast-icon' />}
                        <p className="uv-value">{defaultWeatherData?.uv}</p>
                        <h3 className="uv-title">UV</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather