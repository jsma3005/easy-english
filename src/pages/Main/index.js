import cls from './Main.module.scss';
import Bird from './img/bird.svg';
import Modal from '../../components/Modal';
import { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import './selectors.css';
import { fire } from '../../services/firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import TimerComponent from '../../components/Timer';


const levelOptions = [
    {
        id: 1,
        level: 'Elementary'
    },
    {
        id: 2,
        level: 'Pre-Intermediate'
    },
    {
        id: 3,
        level: 'Intermediate'
    },
    {
        id: 4,
        level: 'Upper-Intermediate'
    },
    {
        id: 5,
        level: 'Advanced'
    },
    {
        id: 6,
        level: 'Proficient'
    }
]

const formatOptions = [
    {
        id: 1,
        title: 'Онлайн через любую платформу'
    },
    {
        id: 2,
        title: 'В нашем уютном офисе'
    }
]

const Main = () => {
    const [modalActive, setModalActive] = useState(false);
    const [phoneInput, setPhoneInput] = useState('');
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [formatState, setFormatState] = useState('');
    const [levelState, setLevelState] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [privacyCheck, setPrivacyCheck] = useState(false);
    const TIMER = 900000;
    const history = useHistory();


    useEffect(() => {
        localStorage.removeItem('easyEnglishRegisteredState');
        if(formatState && levelState && privacyCheck && !isPhoneError){
            if(!phoneInput){
                setButtonDisabled(true);
            }else{
                setButtonDisabled(false);
            }
        }else{
            setButtonDisabled(true);
        }
    }, [levelState, formatState, phoneInput, privacyCheck, isPhoneError])

    const handleSubmit = e => {
        e.preventDefault();
        setButtonDisabled(true);
        
        fire.database().ref('/registered').push({
            phone: phoneInput,
            format: formatState,
            level: levelState
        })
        .then(() => {
            localStorage.setItem('easyEnglishRegisteredState', true);
        })
        .then(() => {
            history.push('/finished-register')
        })
        .catch(() => {
            alert('Что-то пошло не так!')
            setPhoneInput('')
        })
    }

    const handleTimerLeft = time => {
        if(time < 10){
            return '0'
        }else{
            return String(time).split('')[0]
        }
    }

    const handleTimerRight = time => {
        if(time > 0 && time < 10){
            return time
        }else if(time === 0){
            return '0'
        }else{
            return String(time).split('')[1]
        }
    }

    return (
        <div className={cls.root}>
            <div className={cls.header}>
                <h1>Академия EASY English</h1>
            </div>
            <div className={cls.content}>
                <div className={cls.guarantee}>
                    <h1>Доведем до результата с гарантией</h1>
                    <img src={Bird} alt='Bird' />
                </div>
                <div className={cls.demoLesson}>
                    <h1>Запишись на пробный урок прямо сейчас 
                    <br /> 
                    и получи скидку в 2000 рублей на весь курс</h1>
                </div>
                <div className={cls.feautAndTime}>
                    <div className={cls.feautures}>
                        <div className={cls.card}>
                            <p
                                style={{
                                    borderLeft: `3px solid #2099D0`
                                }}
                            >Новейшая методика изучения flipped classroom</p>
                        </div>
                        <div className={cls.card}>
                            <p
                                style={{
                                    borderLeft: `3px solid #30BFA7`
                                }}
                            >Профессиональные преподаватели – лингвокоучи</p>
                        </div>
                        <div className={cls.card}>
                            <p
                                style={{
                                    borderLeft: `3px solid #FFA230`
                                }}
                            >Лицензия Минобразования Сертификат по окончании</p>
                        </div>
                        <div className={cls.card}>
                            <p
                                style={{
                                    borderLeft: `3px solid #F44D4D`
                                }}
                            >Гарантированный результат <br /> <span>каждому</span></p>
                        </div>
                    </div>
                    <div className={cls.signUp}>
                        <button onClick={() => setModalActive(true)}>Записаться</button>
                        <div className={cls.time}>
                            <TimerComponent totalTimer={TIMER} cls={cls} handleTimerLeft={handleTimerLeft} handleTimerRight={handleTimerRight} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={cls.modal}>
                    <div className={cls.top}>
                        <h1>Для записи на пробный урок, пожалуйста, заполни поля ниже</h1>
                        <form className={cls.modalForm}>
                            <InputMask 
                                value={phoneInput} 
                                onChange={e => {
                                    const value = e.target.value;
                                    setPhoneInput(value)
                                    if(value.length !== 18){
                                        setIsPhoneError(true);
                                    }else{
                                        setIsPhoneError(false)
                                    }
                                }}
                                mask='+7 (999) 999-99-99' 
                                className={!isPhoneError ? cls.phoneInput : `${cls.phoneInput} ${cls.phoneInputValid}`} 
                                placeholder='Телефон'
                                maskChar={null}
                            />
                            <Select 
                                options={formatOptions}
                                dropdownHandle={true}
                                keepSelectedInList={true}
                                labelField='title'
                                valueField='title'
                                className='format'
                                placeholder='Формат обучения'
                                searchable={false}
                                onChange={value => setFormatState(value[0].title)}
                            />
                            <Select 
                                options={levelOptions}
                                dropdownHandle={true}
                                keepSelectedInList={true}
                                labelField='level'
                                valueField='level'
                                className='levelSelect'
                                placeholder='Уровень английского'
                                searchable={false}
                                onChange={value => setLevelState(value[0].level)}
                            />
                        </form>
                        <div className={cls.checkBox}>
                            <input onChange={e => setPrivacyCheck(e.target.checked)} checked={privacyCheck} id='check' type='checkbox' />
                            <label htmlFor='check'>
                                <span>Я согласен на обработку <Link to='/privat-policy'>персональных данных</Link></span>
                            </label>
                        </div>
                    </div>
                    <div className={cls.bottom}>
                        <div className={cls.signUp}>
                            <button className={buttonDisabled ? cls.disabledBtn : null} disabled={buttonDisabled} onClick={handleSubmit}>Записаться</button>
                            <div className={cls.time}>
                                <TimerComponent totalTimer={TIMER} cls={cls} handleTimerLeft={handleTimerLeft} handleTimerRight={handleTimerRight} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
                
        </div>
    )
}

export default Main;