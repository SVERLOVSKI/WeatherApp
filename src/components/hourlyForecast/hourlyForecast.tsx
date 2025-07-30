import { getDefaultForecastData } from '../../features/locationSlice'
import { useAppSelector } from '../../app/hooks'
import WindIconBlack from '../currentWeather/imgs/wind/wind_black.svg'
import WindIconWhite from '../currentWeather/imgs/wind/wind_white.svg'
import './hourlyForecast.css'

interface HourlyForecastProps {
    darkTheme: boolean
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ darkTheme }) => {
    const defaultWeatherData = useAppSelector(getDefaultForecastData)

    const hourlyList = defaultWeatherData?.forecastday[0].hour.map((item, index) => {
        let selectedIndex = [9,12,15,18,21];

        if (selectedIndex.includes(index)) {
            return (
                <li key={item.time} className="hourly-forecast-item">
                    <p className="item-time">{defaultWeatherData?.forecastday[0].hour[index].time.split(" ")[1]}</p>
                    <img src={defaultWeatherData?.forecastday[0].hour[index].condition.icon} alt="" className='item-icon hourly' />
                    <p className="hourly-item-temperature">{defaultWeatherData?.forecastday[0].hour[index].temp_c} °C</p>
                    <img src={darkTheme ? WindIconWhite : WindIconBlack} alt="" className='item-icon hourly' />
                    <p className="item-wind">{defaultWeatherData?.forecastday[0].hour[index].wind_kph} km/h</p>
                </li>
            )
        } else {
            return
        }
    })

    return (
        <div className="hourly-forecast">
            <h3 className="hourly-forecast-title">Hourly Forecast</h3>
            <ul className="hourly-forecast-list">
                {hourlyList}
            </ul>
        </div>
    )
}

export default HourlyForecast