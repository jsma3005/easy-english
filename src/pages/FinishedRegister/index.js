import cls from './FinishedRegister.module.scss';
import Img1 from './img/1.png';
import Img2 from './img/2.png';
import Img3 from './img/3.png';
import Img4 from './img/4.png';
import FeedImg1 from './img/feedImg1.png';
import FeedImg2 from './img/feedImg2.png';
import Bird from './img/bird.svg';
import FB from './img/fb.svg';
import VK from './img/vk.svg';
import Insta from './img/insta.svg';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import Carousel from 'react-elastic-carousel';
import { useEffect, useRef } from 'react';
import Media from 'react-media';

const carouselData = [
    {
        id: 1,
        avatar: FeedImg1,
        name: 'Эльвира Кутуева',
        comment: 'Замечательно, что есть такая школа, как EASY ENGLISH 😌 всегда приветливы, дружелюбны. Всё расскажут, объяснят, чувствуешь себя как дома🏡🤗 Огромное спасибо преподавателям, нашли подход к каждому, объясняют всё доходчиво, а главное, что наша группа заговорила по-английски в очень короткие сроки. Атмосфера на занятиях дружелюбная, комфортная, обучаюсь с удовольствием, время летит незаметно. Спасибо, что вы есть!'
    },
    {
        id: 2,
        avatar: FeedImg2,
        name: 'Влад Клековкин',
        comment: 'Это лучшие уроки английского языка которые у меня только были.(было много)Преподаватили умные, с хорошим знанием английского, и не заставят заскучать. Урок полностью проходит на ангийском, и вы погружаетесь в ту самую атмосферу. Так-же часто приходят носители языка и проводят уроки.Мне очень понравилось всем советую!!!!!!👍👍👍👍(Так-же есть хороший лагерь и по субботам кино на английском со вкусняшками на Островского 38 '
    }
]

const socialData = [
    {
        id: 1,
        title: 'facebook',
        href: 'https://www.facebook.com/',
        icon: FB
    },
    {
        id: 2,
        title: 'vkontakte',
        href: 'https://www.vk.com/',
        icon: VK
    },
    {
        id: 3,
        title: 'instagram',
        href: 'https://www.instagram.com',
        icon: Insta
    }
]


const FinishedRegister = () => {
    const carousel = useRef();

    useEffect(() => {
        localStorage.removeItem('easyEnglishRegisteredState');
    }, [])

    return (
        <div className={cls.root}>
            <div className={cls.header}>
                <h1>Академия EASY English</h1>
            </div>
            <div className={cls.finish}>
                <h1>Поздравляем! ты успешно прошел регистрацию</h1>
                <h2>Теперь ты на шаг ближе к своей цели</h2>
            </div>
            <div className={cls.contentRow}>
                <div className={cls.gallery}>
                    <img className={cls.bigImg} src={Img1} alt='Gallery' />
                    <div className={cls.galleryRow}>
                        <img src={Img2} alt='Gallery' />
                        <img src={Img3} alt='Gallery' />
                        <img src={Img4} alt='Gallery' />
                    </div>
                </div>
                <div className={cls.feedback}>
                    <div className={cls.feedbackContent}>
                        <div className={cls.carouselHeader}>
                            <h1>Отзывы наших учеников</h1>
                            <div className={cls.arrows}>
                                <button onClick={() => {
                                    carousel.current.slidePrev()
                                }} className={`${cls.next} next`}><FiArrowLeftCircle /></button>
                                <button onClick={() => {
                                    carousel.current.slideNext()
                                }} className={`${cls.prev} prev`}><FiArrowRightCircle /></button>
                            </div>
                        </div>
                        <div className={cls.carouselContent}>
                            <Media queries={{
                                lg: "(max-width: 1360px)",
                                md: "(max-width: 850px)"
                            }}>
                                {
                                    matches => (
                                        <Carousel 
                                            ref={carousel}
                                            itemsToShow={matches.md ? 1 : matches.lg ? 2 : 1}
                                            pagination={false}
                                            showArrows={false}
                                        >
                                            {
                                                carouselData.map(({ id, avatar, comment, name }) => (
                                                    <div className={cls.carouselItem} key={id}>
                                                        <div className={cls.carouselAvatar}>
                                                            <img src={avatar} alt='Avatar' />
                                                            <span>{name}</span>
                                                        </div>
                                                        <p>{comment}</p>
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    )
                                }
                            </Media>
                            
                        </div>
                    </div>
                    
                    <div className={cls.contacts}>
                        <div className={cls.contactsText}>
                            <p>Загляни к нам в гости:</p>
                            <img src={Bird} alt='bird' />
                        </div>
                        <div className={cls.social}>
                            <ul>
                                {
                                    socialData.map(({ id, title, icon, href}) => (
                                        <li key={id}>
                                           <a target="_blank" rel='noreferrer' href={href}>
                                               <img src={icon} alt='Social icon' />
                                               <span>{title}</span>
                                           </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinishedRegister
