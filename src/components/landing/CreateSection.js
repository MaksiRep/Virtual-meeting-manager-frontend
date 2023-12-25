import React, {useRef, useEffect, useState} from "react";
import '../styles/CreateSection.css'

function CreateSection(props) {

    const [age, setAge] = useState('0');
    const startDateRef = useRef();
    const endDateRef = useRef();
    const genderRef = useRef();
    const searchRef = useRef();
    const [isFilterOn, setFilterState] = useState(false);

    const handleChangeAge = (e) => {
        setAge((e.target.value));
    }

    const handleClickFilters = () => {
        setFilterState(!(isFilterOn));
    }

    const handleCreateClick = () => {
        props.onCreateClick();
    }

    const handleClearForm = () => {
        setAge('0');
        startDateRef.current.value = '';
        endDateRef.current.value = '';
        genderRef.current.value = 'default';
        searchRef.current.value = '';
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        props.onSearchSubmit({
            skip: 0,
            take: 30,
            minAge: Number(age) ? Number(age) : null,
            startDate: startDateRef.current.value ? startDateRef.current.value  + 'T00:00:00.000Z' : null,
            endDate: endDateRef.current.value ? endDateRef.current.value + 'T23:59:59.999Z' : null,
            genderType: (!(genderRef.current.value === 'default') && genderRef.current.value) ? genderRef.current.value : null,
            nameTerm: searchRef.current.value ? searchRef.current.value : null
        })
    }

    return(
        <div className='joint-section'>
            <form className='filter-section' onSubmit={handleSubmitSearch}>
                <div className='search-section'>
                    <input className='search-input' type='text' placeholder='Название' ref={searchRef}/>
                    <button className='cancel-button' type='button' onClick={handleClearForm}/>
                    <button className='search-button' type='submit'/>
                    <button className={`filter-button ${isFilterOn ? 'filter-button-active' : ''}`}
                            onClick={handleClickFilters} type='button'/>
                </div>
                <div className={`filter-options ${isFilterOn ? '' : 'filter-options-none'}`}>
                    <div className='date-range-section'>
                        <label className='form__label'>От:</label>
                        <input className='form-auth__input filter-date' type='date' placeholder='От'
                               id='birth-date-input' name='birth-date' min="1900-01-01" ref={startDateRef}/>
                        <label className='form__label'>До:</label>
                        <input className='form-auth__input filter-date' type='date' placeholder='До'
                               id='birth-date-input' name='birth-date' min="1900-01-01" ref={endDateRef}/>
                    </div>
                    <div className='other-options'>
                        <div className='gender-section'>
                            <label className='form__label label-gender'>Ограничение по полу:</label>
                            <select className='form-auth__input filter-gender' placeholder='Пол'
                                    id='password-repeat-input' name='password' ref={genderRef} defaultValue={'default'}>
                                <option value='default' disabled>Пол</option>
                                <option value='male'>Муж</option>
                                <option value='female'>Жен</option>
                                <option value=''>Нет</option>
                            </select>
                        </div>
                        <div className='filter-age-section'>
                            <label className='form__label'>Ограничение по возрасту:</label>
                            <div>
                                <label className='form__label'>{age} лет</label>
                                <input className='filter-age' type='range' min='0' max='123' defaultValue='0'
                                       onChange={handleChangeAge} value={age}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className='joint-section__create'>
                <button className="joint-section__add-button" type="button" onClick={handleCreateClick}></button>
            </div>
        </div>
    );

}

export default CreateSection