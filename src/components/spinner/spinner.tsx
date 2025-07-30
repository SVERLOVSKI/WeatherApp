import SpinnerIconWhite from './spinner_white.svg'
import SpinnerIconBlack from './spinner_black.svg'
import './Spinner.css';
import { useAppSelector } from '../../app/hooks';
import { getLoadingStatus } from '../../features/locationSlice';

interface SpinnerProps {
  darkTheme: boolean
}

const Spinner: React.FC<SpinnerProps> = ({ darkTheme }) => {
  const loadingStatus = useAppSelector(getLoadingStatus)

  if (loadingStatus === 'completed') return null;

  if (loadingStatus === "rejected") return (
    <div className="spinner-overlay">
      <h1>Произошла ошибка! Попробуйте позднее</h1>
    </div>
  )

  if (loadingStatus === 'inProgress') return (
    <div className="spinner-overlay">
      <img src={darkTheme ? SpinnerIconWhite : SpinnerIconBlack} alt="Loading..." className="spinner-image rotating-element" />
    </div>
  )
};

export default Spinner