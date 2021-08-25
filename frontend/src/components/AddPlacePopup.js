import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm name="add-form" title="Новое место" text="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="new-name-input" type="text" name="name" placeholder="Название" value={name || ''} onChange={handleChangeName} className="popup__container-input" minLength="2" maxLength="30" required />
            <span className="new-name-input-error popup__container-input-error"></span>
            <input id="url-input" type="url" name="link" placeholder="Ссылка на картинку" value={link || ''} onChange={handleChangeLink} className="popup__container-input" required />
            <span className="url-input-error popup__container-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup