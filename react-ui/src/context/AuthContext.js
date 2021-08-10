import React, {createContext, Component} from 'react';
import socket from "./SocketIOInstance";

/**
 * Contexte d'authentification
 */
export const AuthContext = createContext();

/**
 * Informations d'authentification
 */
class AuthContextProvider extends Component {

    constructor(props) {
        super(props);

        /**
         * Récupération du pseudo sauvegardé
         */
        const prevMail = window.localStorage.getItem('mail') || "";
        /**
         * Récupération du mot de passe sauvegardé
         */
        const prevPassword = window.localStorage.getItem('password') || "";

        /**
         * Initialisation de l'état
         */
        this.state = {
            //État de connexion
            authenticated: false,
            //Adresse mail
            mail: prevMail,
            //Mot de passe
            password: prevPassword,
            //Initialisation
            loaded: false,
            //Modifier l'état de connexion
            setAuthenticated: this.setAuthenticated.bind(this),
            //Modifier le pseudo
            setMail: this.setMail.bind(this),
            //Modifier le mot de passe
            setPassword: this.setPassword.bind(this),
            //Déconnecter l'utilisateur
            disconnect: this.disconnect.bind(this)
        };
    }

    /**
     * Initialisation du composant
     */
    componentDidMount() {
        //Envoi des infos au serveur pour valider l'auauth_infothentification
        socket.emit("login", this.state.mail, this.state.password);
        //Récupération des informations de connexion
        socket.on("auth_info", (success) => {
            
            //Si c'est un succès
            if (success == true) {
                //Authentification validée
                if(success=="admin"){
                    
                    this.setAuthenticated("admin");
    
                }else{
                    this.setAuthenticated(true);
                }
                
            } 
            //Initialisation effectuée
            this.setState({"loaded": true});
        });
    }

    /**
     * Mettre à jour l'état d'authentification
     * @param value état
     */
    setAuthenticated(value) {
      //console.log("value is",value)
        this.setState({authenticated: value});
        //Sauvegarde de l'état dans l'espace local
        window.localStorage.setItem('authenticated', value);
    }

    /**
     * Mettre à jour le pseudo
     * @param mail pseudo
     */
    setMail(mail) {
        this.setState({mail: mail});
        //Sauvegarde du pseudo dans l'espace local
        window.localStorage.setItem('mail', mail);
    }

    /**
     * Mettre à jour le mot de passe
     * @param password mot de passe
     */
    setPassword(password) {
        this.setState({password: password});
        //Sauvegarde du mot de passe dans l'espace local
        window.localStorage.setItem('password', password);
    }

    /**
     * Déconnexion de l'utilisateur
     */
    disconnect() {
        this.setState({
            //État de connexion à faux
            authenticated: false,
            //Pseudo vide
            mail: "",
            //Mot de passe vide
            password: "",
        });
        //Suppression du pseudo sauvegardé
        window.localStorage.removeItem('mail');
        //Suppression du mot de passe sauvegardé
        window.localStorage.removeItem('password');
    }

    render() {
        //État du composant
        const contextData = this.state;

        return (
            <AuthContext.Provider value={contextData}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;
