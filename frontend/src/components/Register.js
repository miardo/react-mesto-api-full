import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [data, setData] = useState ({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        onRegister({ email, password })
    }
    
    return (
        <form onSubmit={handleSubmit} name="login-form" className="verification">
            <h2 className="verification__title">Регистрация</h2>
            <input value={data.email || ''} onChange={handleChange} id="email" type="email" name="email" placeholder="Email" className="verefication__input" minLength="2" maxLength="40" required />
            <input value={data.password || ''} onChange={handleChange}  id="password" type="password" name="password" placeholder="Пароль" className="verefication__input" minLength="2" maxLength="200" required />
            <button type="submit" className="verefication__submit-button">Зарегистрироваться</button>
            <p className="verefication__footer">Уже зарегистрированы? <Link to="/sign-in" className="verefication__footer-link" >Войти</Link></p>
        </form>
    );
}

export default Register;