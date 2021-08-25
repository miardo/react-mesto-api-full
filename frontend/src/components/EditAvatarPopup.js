import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const refAvatar = useRef('')

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: refAvatar.current.value,
        });
    }

    return (
        <PopupWithForm name="ava-form" title="Обновить аватар" decoration="popup__container-name_style-edition" text="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input ref={refAvatar} id="ava-url-input" type="url" name="link" placeholder="Ссылка на аватарку" className="popup__container-input popup__container-input_style-edition" required />
            <span className="ava-url-input-error popup__container-input-error popup__container-input-error_style-edition"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;