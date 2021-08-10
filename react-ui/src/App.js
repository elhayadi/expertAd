import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect,} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import "./App.css";
import PrivateRoute from "./components/routing/PrivateRoute";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Profil from './components/UserProfile'
import Signup from './components/auth/Signup';
import AuthButton from './components/auth/AuthButton';
import {AuthContext} from "./context/AuthContext";
import UserReservations from "./components/UserReservations";
import UserBills from "./components/UserBills";

class App extends Component {
    /**
     * Contexte d'authentification
     */
    static contextType = AuthContext;

    render() {
        return (
            <Router>
                <Navbar sticky="top" className="navbar-top" bg={"light"} variant={"light"}>
                    <Navbar.Brand>
                        <Link className="navbar-brand text-primary" to="/">
                            <img alt="logo" src={process.env.PUBLIC_URL + '/'} width="30" height="30"
                                 className="d-inline-block mb-1 mr-2"/>
                                <strong>Riad</strong> Essouiri
                        </Link>
                    </Navbar.Brand>
                    <NavLinks authenticated={this.context.authenticated}/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <AuthButton/>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/signup">
                        <Signup/>
                    </Route>
                    <PrivateRoute path="/profil">
                        <Profil/>
                    </PrivateRoute>
                    <PrivateRoute path="/reservations">
                        <UserReservations/>
                    </PrivateRoute>
                    <PrivateRoute path="/factures">
                        <UserBills />
                    </PrivateRoute>
                    <Redirect to="/"/>
                </Switch>
            </Router>
        );
    }
}

/**
 * Liens vers les différentes pages de l'application
 */
function NavLinks(props) {
    //Si l'utilisateur est authentifié
    if(props.authenticated=="admin"){
        return  (
            <Nav className="mr-auto">
               
            </Nav>
        ) 
    }
    return props.authenticated ? (
        <Nav className="mr-auto">
            <Link className="nav-link" to="/profil">Profil</Link>
            <Link className="nav-link" to="/reservations">Réservations</Link>
            <Link className="nav-link" to="/factures">Factures</Link>
        </Nav>
    ) : (
        <Nav className="mr-auto"/>
    );
}

export default App;
