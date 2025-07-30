import { useAppSelector } from '../../app/hooks'
import { getDefaultForecastData } from '../../features/locationSlice'
import { Link } from 'react-router'
import './Forecast.css'

export const ForeCast = () => {
    const defaultWeatherData = useAppSelector(getDefaultForecastData);

    const formateDate = (existingDate: string) => {
        const date = new Date(existingDate);

        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`;
    }

    const dailyForecast = defaultWeatherData?.forecastday.map((item, index) => {
        let selectedIndex = [1, 2, 3, 4, 5]
        let date = defaultWeatherData?.forecastday[index].date

        if (selectedIndex.includes(index)) {
            return (
                <Link key={item.date} to={`/forecast/${date}`}>
                    <li className="forecast-item">
                        <p className="item-date">{formateDate(defaultWeatherData?.forecastday[index].date)}</p>
                        <img src={defaultWeatherData?.forecastday[index].day.condition.icon} alt="" className='item-icon inday' />
                        <p className="item-temperature">{defaultWeatherData?.forecastday[index].day.avgtemp_c}°C</p>
                        <p className="item-wind forecast">{defaultWeatherData?.forecastday[index].day.maxwind_kph}km/h</p>
                        <p className="item-condition">{defaultWeatherData?.forecastday[index].day.condition.text}</p>
                    </li>
                </Link>
            )
        } else {
            return
        }
    })

    return (
        <div className="forecast-bar">
            <h3 className="forecast-title">2 Days Forecast</h3>
            <ul className="forecast-list">
                {dailyForecast}
            </ul>
        </div>
    )
}

export default ForeCast