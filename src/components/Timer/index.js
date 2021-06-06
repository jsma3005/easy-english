import Timer from 'react-compound-timer';

const TimerComponent = ({ totalTimer, cls, handleTimerLeft, handleTimerRight }) => {
    return (
        <>
            <Timer
                initialTime={totalTimer}
                direction='backward'
            >
                <div className={cls.timeRow}>
                    <div className={cls.minutes}>
                        <span className={cls.item}>
                            <Timer.Minutes 
                                formatValue={handleTimerLeft}
                            />
                        </span>
                        <span className={cls.item}>
                            <Timer.Minutes 
                                formatValue={handleTimerRight}
                            />
                        </span>
                    </div>
                    <div className={cls.divider}>
                        <span>:</span>
                    </div>
                    <div className={cls.seconds}>
                        <span className={cls.item}>
                            <Timer.Seconds 
                                formatValue={handleTimerLeft} 
                            />
                        </span>
                        <span className={cls.item}>
                            <Timer.Seconds 
                                formatValue={handleTimerRight}
                            />
                        </span>
                    </div>
                </div>
            </Timer>
            <div className={cls.timeText}>
                <p>Минуты</p>
                <p>Секунды</p>
            </div>
        </>
    )
}

export default TimerComponent