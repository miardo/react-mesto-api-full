import React, { useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    const currentUser = useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit-form" title="Редактировать профиль" text="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="name-input" type="text" name="name" placeholder="Имя" value={name || ''} onChange={handleChangeName} className="popup__container-input" minLength="2" maxLength="40" required />
            <span className="name-input-error popup__container-input-error"></span>
            <input id="job-input" type="text" name="about" placeholder="Вид деятельности" value={description || ''} onChange={handleChangeDescription} className="popup__container-input" minLength="2" maxLength="200" required />
            <span className="job-input-error popup__container-input-error"></span>
        </PopupWithForm>
    )
};

export default EditProfilePopup;