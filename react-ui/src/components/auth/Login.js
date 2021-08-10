import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Form, Button, Card, Container, Row} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import socket from "../../context/SocketIOInstance";
import {AuthContext} from "../../context/AuthContext";

/**
 * Connexion
 */
class Login extends Component {
    /**
     * Contexte d'authentification
     */
    static contextType = AuthContext;

    constructor(props,context) {
        super(props,context);

        /**
         * Initialisation de l'état
         */
        this.state = {
            //Erreur d'authentification
            isError: false
        };

        this.postLogin = this.postLogin.bind(this);
        this.submitLoginEnter = this.submitLoginEnter.bind(this);
    }

    /**
     * Demande d'authentification
     */
    postLogin() {
        //Envoi des infos au serveur pour valider l'authentification
       
        socket.emit("login", this.context.mail, this.context.password);
        //Récupération des informations de connexion
        socket.on("auth_info", (success) => {
            //Si c'est un succès
            
            if (success){
                //Authentification validée
                if(success=="admin"){
                   
                   this.context.setAuthenticated("admin");
    
                }else{
                   this.context.setAuthenticated(true);
                }
                
               // this.context.setAuthenticated(true);
            }else {
                //Authentification invalide
                this.context.setAuthenticated(false);
                //Erreur
                this.setState({isError: true});
            }
        });
        return false;
    }

    /**
     * Connexion en appuyant sur entrée
     * @param event touche du clavier
     */
    submitLoginEnter(event) {
        //Si la touche est entrée, appel de la fonction d'authentification
        if (event.which === 13) this.postLogin();
    }

    render() {
        //Si l'utilisateur est authentifié, redirection vers la page d'accueil
        if (this.context.authenticated) return <Redirect to="/"/>;

        return (
            <Container className="flex-center position-ref full-height" fluid>
                <Row className="justify-content-md-center">
                    <Card style={{width: '20rem'}} className="text-center no-border fade-effect" body>
                        <Card.Img variant="top" id="logo" className="mb-4" src={process.env.PUBLIC_URL + ''}/>
                        <h1>Logo image here</h1>
                        <Form id="loginform">
                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    onChange={e => this.context.setMail(e.target.value)}
                                    placeholder="Adresse mail"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    onChange={e => this.context.setPassword(e.target.value)}
                                    onKeyPress={e => this.submitLoginEnter(e)}
                                    placeholder="Mot de passe"
                                />
                            </Form.Group>
                            <Button variant="dark" className="mt-4 border-0" onClick={this.postLogin} block>
                                Connexion
                            </Button>
                            <Button className="mb-4 text-white navbar-top border-0" onClick={() => this.props.history.push("/signup")} block>
                                Créer un compte
                            </Button>
                        </Form>
                        <Card.Text
                            className="text-danger error-message">{this.state.isError ? "Erreur d'authentification" : ""}</Card.Text>
                    </Card>
                </Row>
            </Container>
        );
    }
}

//withRouter pour récupérer l'historique
export default withRouter(Login);
