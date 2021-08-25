import React from 'react';
import approvedImg from '../images/approved.svg';
import errorImg from '../images/error.svg';

function InfoTooltip(props) {
    return (
        <article className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_style-info">
                <img className="popup__container-info-image" src={props.img === true ? approvedImg : errorImg} alt={props.title}/>
                <h2 className="popup__container-name popup__container-name_style-info">{props.title}</h2>
                <button name="close-form" type="button" className="popup__container-close-button" aria-label="Закрыть форму" onClick={props.onClose}></button>
            </div>
        </article>
    );
}

export default InfoTooltip;