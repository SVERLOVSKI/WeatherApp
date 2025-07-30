import { useEffect } from 'react'
import { Link } from 'react-router'
import ThemeToggleButton from '../components/themeToggleButton/themeToggleButton'
import SearchBar from '../components/searchBar/SearchBar'
import CurrentWeather from '../components/currentWeather/currentWeather'
import ForeCast from '../components/forecast/Forecast'
import HourlyForecast from '../components/hourlyForecast/hourlyForecast'
import { fetchLocation } from '../features/locationSlice'
import { useAppDispatch } from '../app/hooks'
import Spinner from '../components/spinner/spinner'

interface MainPageProps {
    darkTheme: boolean
    setDarkTheme: (darkTheme:boolean) => void
}

export const MainPage:React.FC<MainPageProps> = ({darkTheme, setDarkTheme}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchLocation())
        window.scrollTo(0, 0);
    }, [])

    return (
        <main className='main'>
            <div className="main-container">
                <Spinner darkTheme={darkTheme} />
                <div className="interface-panel">
                    <Link className='logo' to={'/'}>SkyWatch</Link>
                    <ThemeToggleButton darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                    <SearchBar darkTheme={darkTheme} />
                </div>
                <div className="weather-forecast">
                    <CurrentWeather darkTheme={darkTheme} />
                    <div className="future-forecast">
                        <ForeCast />
                        <HourlyForecast darkTheme={darkTheme} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainPage