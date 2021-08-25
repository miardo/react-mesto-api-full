import React from 'react';

function PopupWithForm(props) {
    return (
        <article className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <form name={`${props.name}`} className="popup__container" onSubmit={props.onSubmit}>
                <h2 className={`popup__container-name ${props.decoration}`}>{props.title}</h2>
                {props.children}
                <button type="submit" className="popup__container-submit-button popup__container-submit-button" >{props.text}</button>
                <button name="close-form" type="button" className="popup__container-close-button" aria-label="Закрыть форму" onClick={props.onClose}></button>
            </form>
        </article>
    );
}

export default PopupWithForm