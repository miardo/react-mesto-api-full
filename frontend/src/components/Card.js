import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `elements__delete-button ${isOwn ? '' : 'elements__delete-button_hidden'}`
    );

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `elements__button ${isLiked ? `elements__button_active` : ``}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <article className="elements__box">
            <img src={props.card.link} alt={props.card.name} onClick={handleClick} className="elements__photo" />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить карточку"></button>
            <div className="elements__footer">
                <h3 className="elements__text">{props.card.name}</h3>
                <div className="elements__like-block">
                    <button type="button" className={cardLikeButtonClassName} aria-label="Лайк" onClick={handleLikeClick}></button>
                    <p className="elements__likes-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card