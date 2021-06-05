import cls from './Modal.module.scss';

const Modal = ({ active, setActive, children }) => {
    return (
        <div className={active ? `${cls.modal} ${cls.active}` : cls.modal} onClick={() => setActive(false)}>
            <div className={active ? `${cls.modalContent} ${cls.modalContentActive}` : cls.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal