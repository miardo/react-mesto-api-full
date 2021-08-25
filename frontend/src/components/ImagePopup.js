import React from 'react';

function ImagePopup(props) {
    return (
        <article className={`popup popup_type_show-image ${props.card.link ? 'popup_opened' : ''}`}>
            <form name="image-form" className="popup__container popup__container_style-edition">
                <figure className="popup__container-image-block">
                    <img src={`${props.card.link}`} alt={props.card.name} className="popup__container-image" />
                    <figcaption className="popup__container-text">{props.card.name}</figcaption>
                </figure>
                <button name="close-image" type="button" className="popup__container-close-button" aria-label="Закрыть картинку" onClick={props.onClose}></button>
            </form>
        </article>
    );
}

export default ImagePopup