import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__img">
                    <div style={{ backgroundImage: `url(${currentUser.avatar})` }} alt="Аватарка профиля" className="profile__photo"></div>
                    <button type="button" className="profile__edit-photo-button" aria-label="Редактировать аватарку" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__account">
                    <div className="profile__name">
                        <h1 className="profile__name-text">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" aria-label="Добавить карточку" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card
                        card={card}
                        key={card._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main