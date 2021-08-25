import React, { useState } from 'react';

function Login({ onLogin }) {
    const [data, setData] = useState({
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
        onLogin({ email, password })
    }

    return (
        <form name="login-form" className="verification" onSubmit={handleSubmit}>
            <h2 className="verification__title">Вход</h2>
            <input value={data.email || ''} onChange={handleChange} id="email" type="email" name="email" placeholder="Email" className="verefication__input" minLength="2" maxLength="40" required />
            <input value={data.password || ''} onChange={handleChange} id="password" type="password" name="password" placeholder="Пароль" className="verefication__input" minLength="2" maxLength="200" required />
            <button type="submit" className="verefication__submit-button" >Войти</button>
        </form>
    );
}

export default Login;