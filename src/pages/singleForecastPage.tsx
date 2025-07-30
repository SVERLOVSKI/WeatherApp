import { useParams } from 'react-router'
import { useAppSelector } from '../app/hooks'
import { getSelectedDayForecast, getDefaultCityData } from '../features/locationSlice'
import ThemeToggleButton from '../components/themeToggleButton/themeToggleButton'
import SearchBar from '../components/searchBar/SearchBar'
import './singleForecastPage.css'
import {useEffect } from 'react'
import { Link } from 'react-router'

interface SingleForecastPageProps {
    darkTheme: boolean
    setDarkTheme: (darkTheme: boolean) => void
}

const SingleForecastPage:React.FC<SingleForecastPageProps> = ({darkTheme, setDarkTheme}) => {
    const date: {date?: string} = useParams()
    const selectedDay = useAppSelector(state => getSelectedDayForecast(state, date))
    const defaultWeatherData = useAppSelector(getDefaultCityData)
    let forecastList = null

    const formateDate = (existingDate:string) => {
        const date = new Date(existingDate);

        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    }

    useEffect(() => {
            window.scrollTo(0, 0);
        }, [])

    if (selectedDay) {
        forecastList = selectedDay[0].hour.map((item, index) => {
            const selectedIndex = [0, 3, 6, 9, 12, 15, 18, 21]

            if (selectedIndex.includes(index)) {
                return (
                    <li key={item.time} className="day-forecast-item">
                        <p className="day-forecast-temp">{selectedDay[0].hour[index].temp_c} °C</p>
                        <img src={selectedDay[0].hour[index].condition.icon} alt="" className="day-forecast-icon" />
                        <p className="day-forecast-description">{selectedDay[0].hour[index].condition.text}</p>
                        <p className="day-forecast-wind">{selectedDay[0].hour[index].wind_kph}kp/h</p>
                        <p className="day-forecast-time">{selectedDay[0].hour[index].time.split(' ')[1]}</p>
                    </li>
                )
            }
        })
    }

    return (
        <main className='main'>
            <div className="main-container">
                <div className="interface-panel">
                    <Link className='logo' to={'/'}>SkyWatch</Link>
                    <ThemeToggleButton darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                    <SearchBar darkTheme={darkTheme} />
                </div>
                <ul className="day-forecast">
                    <h1 className="day-forecast-city">{defaultWeatherData?.name}</h1>
                    <p className="day-forecast-date">Прогноз погоды на {formateDate(selectedDay?.[0].hour[0].time.split(' ')[0] as unknown as string)}</p>
                    {forecastList}
                </ul>
            </div>
        </main>
    )
}

export default SingleForecastPage