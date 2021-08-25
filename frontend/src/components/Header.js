import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/logo_header.svg';

function Header(props) {
    return (
        <header className="header">
            <Link to="/" className="header__logo-link" >
                <img src={logo} alt="Место Россиия" className="header__logo" />
            </Link>
            <div className="header__box">
            <Switch>
                <Route path="/sign-up">
                    <Link className="header__link" to="/sign-in">Вход</Link>
                </Route>
                <Route path="/sign-in">
                    <Link className="header__link" to="/sign-up">Регистрация</Link>
                </Route>
                <Route path="/">
                <p className="header__link-email">{props.email}</p>
                <Link className="header__link header__link_state" to="/" onClick={props.onSignOut}>Выйти</Link>
                    </Route>
            </Switch>
            </div>
        </header>
    );
}

export default Header