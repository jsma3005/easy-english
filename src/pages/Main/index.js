import cls from './Main.module.scss';
import Bird from './img/bird.svg';
import Modal from '../../components/Modal';
import { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import './selectors.css';
import { fire } from '../../services/firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

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
    const [formatState, setFormatState] = useState('');
    const [levelState, setLevelState] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [privacyCheck, setPrivacyCheck] = useState(false);
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('easyEnglishRegisteredState');
        if(formatState && levelState && phoneInput && privacyCheck){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [levelState, formatState, phoneInput, privacyCheck])

    const handleSubmit = e => {
        e.preventDefault();
        
        fire.database().ref('/registered').push({
            phone: phoneInput,
            format: formatState,
            level: levelState
        })
        .then(() => {
            localStorage.setItem('easyEnglishRegisteredState', true);
        })
        .then(() => {
            setButtonDisabled(true);
            history.push('/finished-register')
        })
        .catch(() => {
            alert('Что-то пошло не так!')
        })
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
                            <div className={cls.timeRow}>
                                <div className={cls.minutes}>
                                    <span className={`${cls.item} ${cls.oneDigit}`}>1</span>
                                    <span className={cls.item}>5</span>
                                </div>
                                <div className={cls.divider}>
                                    <span>:</span>
                                </div>
                                <div className={cls.seconds}>
                                    <span className={cls.item}>0</span>
                                    <span className={cls.item}>0</span>
                                </div>
                            </div>
                            <div className={cls.timeText}>
                                <p>Минуты</p>
                                <p>Секунды</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={cls.modal}>
                    <div className={cls.top}>
                        <h1>Для записи на пробный урок, пожалуйста, заполни поля ниже</h1>
                        <form className={cls.modalForm}>
                            <input value={phoneInput} onChange={e => setPhoneInput(e.target.value)} type='number' className={phoneInput ? cls.phoneInput : `${cls.phoneInput} ${cls.phoneInputValid}`} placeholder='Телефон' />
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
                                <div className={cls.timeRow}>
                                    <div className={cls.minutes}>
                                        <span className={`${cls.item} ${cls.oneDigit}`}>1</span>
                                        <span className={cls.item}>5</span>
                                    </div>
                                    <div className={cls.divider}>
                                        <span>:</span>
                                    </div>
                                    <div className={cls.seconds}>
                                        <span className={cls.item}>0</span>
                                        <span className={cls.item}>0</span>
                                    </div>
                                </div>
                                <div className={cls.timeText}>
                                    <p>Минуты</p>
                                    <p>Секунды</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Main;