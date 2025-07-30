import { useState } from 'react';
import './searchbar.css'
import SearchIconWhite from './searchIcon_white.svg'
import SearchIconBlack from './searchIcon_black.svg'
import { useAppDispatch } from '../../app/hooks';
import { fetchSearchLocation } from '../../features/locationSlice';

interface SearchBarProps {
    darkTheme: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({ darkTheme }) => {
    const [value, setValue] = useState<string>('');
    const dispatch = useAppDispatch()

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const submitForm = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(fetchSearchLocation(value))
        setValue('')
    }


    return (
        <form className='search-bar' onSubmit={submitForm}>
            {darkTheme ? <img src={SearchIconWhite} alt="Иконка поиска" className='search-icon' /> : <img src={SearchIconBlack} alt="Иконка поиска" className='search-icon' />}
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder="Введите название города"
                className='search-input'
            />
            <button className={darkTheme ? 'submit-button' : 'submit-button__light'}>Поиск</button>
        </form>
    );
};

export default SearchBar