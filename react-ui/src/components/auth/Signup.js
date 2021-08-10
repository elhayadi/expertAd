import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import {Card, Form, Button, Row, Container} from "react-bootstrap";
import socket from "../../context/SocketIOInstance";
import {AuthContext} from "../../context/AuthContext";

/**
 * Inscription
 */
class Signup extends Component {
    /**
     * Contexte d'authentification
     */
    static contextType = AuthContext;

    constructor(props,context) {
        super(props,context);

        //Initialisation de l'état
        this.state = {
            //Erreur d'inscription
            isError: false,
            //Message d'erreur
            errorMessage: "",
            //Adresse mail
            mail: "",
            //Nom
            firstname: "",
            //Prénom
            lastname: "",
            //Rue
            street: "",
            //Ville
            city: "",
            //Mot de passe
            password: "",
            //Confirmation du mot de passe
            password_confirm: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitLoginEnter = this.submitLoginEnter.bind(this);
        this.checkData = this.checkData.bind(this);
    }

    /**
     * Vérifier qu'un texte valide une syntaxe
     * @param text
     * @param syntax syntaxe autorisée
     */
    isValid(text, syntax) {
        //Si le texte n'est pas définit
        if (text === null) return false;
        //Renvoi vrai si le texte respecte la syntaxe
        return text.match(syntax);
    }

    /**
     * Demande d'inscription
     */
    handleSubmit() {
        //Vérification de l'adresse mail
        let mailCheck = this.state.mail.match(/\S+@\S+\.\S+/);
        //Vérification du mot de passe
        let passwordCheck = this.state.password.length >= 3;
        //Vérification de la confirmation du mot de passe
        let confirmCheck = this.state.password === this.state.password_confirm;
        //Validation de l'adresse mail
        if (!mailCheck) {
            this.setState({isError: true, errorMessage: "Adresse mail invalide"});
            return false;
        }
        //Validation du mot de passe
        if (!passwordCheck) {
            this.setState({isError: true, errorMessage: "Mot de passe invalide"});
            return false;
        }
        //Validation de la confirmation
        if (!confirmCheck) {
            this.setState({isError: true, errorMessage: "Confirmation invalide"});
            return false;
        }
        //Compression des données dans un objet
        let data = {
            mail: this.state.mail,
            firstname: this.state.firstname.toUpperCase(),
            lastname: this.state.lastname.charAt(0).toUpperCase() + this.state.lastname.slice(1).toLowerCase(),
            street: this.state.street,
            city: this.state.city.charAt(0).toUpperCase() + this.state.city.slice(1).toLowerCase(),
            password: this.state.password
        };
        //Vérification de la taille des données
        for (let value of Object.values(data)) {
            if (value.length < 3) {
                this.setState({isError: true, errorMessage: "Trois caractères minimum"});
                return false;
            }
        }
        //Émission d'une demande d'inscription
        socket.emit("signup", data);
        //Récupération des informations d'inscription
        socket.on("auth_info", (success, errorMessage) => {
            //Si c'est un succès
            if (success) {
                //Définition du mail dans le contexte
                this.context.setMail(this.state.mail);
                //Définition du mot de passe dans le contexte
                this.context.setPassword(this.state.password);
                //Authentification validée
                this.context.setAuthenticated(true);
            }
            //Affichage d'une erreur
            else this.setState({isError: true, errorMessage: errorMessage});
        });
        return false;
    }

    /**
     * Vérifier une donnée avant de la mettre à jour
     * @param stateItem identifiant
     * @param value valeur
     */
    checkData(stateItem, value) {
        let data = {};
        switch (stateItem) {
            case "firstname":
            case "lastname":
            case "city":
                if (value.match(/^[a-zA-Z-]*$/)) data[stateItem] = value;
                break;
            case "street":
                if (value.match(/^[0-9a-zA-Z -']*$/)) data[stateItem] = value;
                break;
            case "mail":
                if (value.match(/^[0-9a-zA-Z_@.-]*$/)) data[stateItem] = value;
                break;
            default:
                break;
        }
        return data;
    }

    /**
     * Connexion en appuyant sur entrée
     * @param event touche du clavier
     */
    submitLoginEnter(event) {
        if (event.which === 13) this.postLogin();
    }

    render() {
        //Si l'utilisateur est authentifié, redirection vers la page d'accueil
        if (this.context.authenticated) return <Redirect to="/"/>;

        return (
            <Container className="flex-center position-ref full-height" fluid>
                <Row className="justify-content-md-center">
                    <Card style={{width: '20rem'}} className="text-center no-border fade-effect" body>
                        <Card.Title className="display-4 text-left mb-4">
                            Inscription
                        </Card.Title>
                        <Form noValidate validated={this.state.validated}>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="email"
                                    min="5"
                                    onChange={e => {
                                        this.setState(this.checkData("mail", e.target.value));
                                    }}
                                    value={this.state.mail}
                                    placeholder="Adresse Mail"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    min="3"
                                    onChange={e => {
                                        this.setState(this.checkData("firstname", e.target.value));
                                    }}
                                    value={this.state.firstname}
                                    placeholder="Nom"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    min="3"
                                    onChange={e => {
                                        this.setState(this.checkData("lastname", e.target.value));
                                    }}
                                    value={this.state.lastname}
                                    placeholder="Prénom"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    min="3"
                                    onChange={e => {
                                        this.setState(this.checkData("street", e.target.value));
                                    }}
                                    value={this.state.street}
                                    placeholder="Adresse"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="text"
                                    min="3"
                                    onChange={e => {
                                        this.setState(this.checkData("city", e.target.value));
                                    }}
                                    value={this.state.city}
                                    placeholder="Ville"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="password"
                                    min="3"
                                    onChange={e => {
                                        this.setState({password: e.target.value});
                                    }}
                                    value={this.state.password}
                                    placeholder="Mot de passe"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    required
                                    type="password"
                                    min="3"
                                    onChange={e => {
                                        this.setState({password_confirm: e.target.value});
                                    }}
                                    onKeyPress={e => this.submitLoginEnter(e)}
                                    value={this.state.password_confirm}
                                    placeholder="Confirmation"
                                />
                            </Form.Group>
                            <Button variant="dark" className="mt-4 mb-4" onClick={this.handleSubmit} block>
                                Valider
                            </Button>
                        </Form>
                        <Link to="/login">Vous avez déjà un compte ?</Link>
                        <Card.Text
                            className="text-danger error-message mt-3">{this.state.isError ? this.state.errorMessage : ""}</Card.Text>
                    </Card>
                </Row>
            </Container>
        );
    }
}

export default Signup;
