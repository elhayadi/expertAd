import React, {Component} from "react";
import {Form, Container, Row, Table} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import socket from "../context/SocketIOInstance";
import Col from "react-bootstrap/Col";
import PencilSquare from "react-bootstrap-icons/dist/icons/pencil-square";
import Check from "react-bootstrap-icons/dist/icons/check";

/**
 * Connexion
 */
class UserProfile extends Component {
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
            firstname: "",
            lastname: "",
            mail: "",
            password: "",
            street: "",
            city: "",
            loaded: false,
            firstname_editing: false,
            lastname_editing: false,
            street_editing: false,
            city_editing: false,
        };

        this.checkData = this.checkData.bind(this);

        this._isMounted = false;
    }

    /**
     * Fonction s'activant a l'initialisation du composant
     */
    componentDidMount() {
        this._isMounted = true;
        const auth = this.context;
        socket.emit("profil",auth.mail);
        socket.on("profil_info",(client) => {
            if (this._isMounted) this.setState({
                'firstname': client.firstname,
                'lastname': client.lastname,
                'street': client.street,
                'city': client.city,
                'mail': client.mail,
                'loaded': true
            });
        });
    }

    /**
     * Destruction du composant
     */
    componentWillUnmount() {
        this._isMounted = false;
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
            default:
                break;
        }
        return data;
    }

    /**
     * Mise à jour des données dans la base de données lorsqu'une modification a été éffectuée
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        let data = undefined;

        if (prevState.firstname_editing && !this.state.firstname_editing && this.state.firstname.length >= 3)
            data = {firstname: this.state.firstname};
        else if (prevState.lastname_editing && !this.state.lastname_editing && this.state.lastname.length >= 3)
            data = {lastname: this.state.lastname};
        else if (prevState.street_editing && !this.state.street_editing && this.state.street.length >= 3)
            data = {street: this.state.street};
        else if (prevState.city_editing && !this.state.city_editing && this.state.city.length >= 3)
            data = {city: this.state.city};

        if (data !== undefined) socket.emit("update_user", data, this.context.mail);
    }

    render() {
        return this.state.loaded ?
            <Container fluid className={"mt-4"}>
                <Row>
                    <Col className={"col-12 mb-4 text-center"}><h1>Profil utilisateur</h1></Col>
                    <Col className={"col-12 fade-effect"}>
                        <Form>
                            <Table responsive className={"w-50 mx-auto"}>
                                <tbody>
                                    <tr>
                                        <td><strong>Prénom</strong></td>
                                        <td>{
                                            this.state.lastname_editing ?
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    min="3"
                                                    className={"w-50"}
                                                    onChange={e => this.setState(this.checkData("lastname",e.target.value))}
                                                    value={this.state.lastname}
                                                />
                                            :
                                                this.state.lastname
                                        }</td>
                                        <td>
                                            {this.state.lastname_editing ?
                                                <Check color={"green"} className={"edit-link"} onClick={() => this.setState({"lastname_editing": !this.state.lastname_editing})}/>
                                            :
                                                <PencilSquare className={"edit-link"} onClick={() => this.setState({"lastname_editing": !this.state.lastname_editing})}/>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Nom</strong></td>
                                        <td>{
                                            this.state.firstname_editing ?
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    min="3"
                                                    className={"w-50"}
                                                    onChange={e => {this.setState(this.checkData("firstname",e.target.value))}}
                                                    value={this.state.firstname}
                                                />
                                            :
                                                this.state.firstname
                                        }</td>
                                        <td>
                                            {this.state.firstname_editing ?
                                                <Check color={"green"} className={"edit-link"} onClick={() => this.setState({"firstname_editing": !this.state.firstname_editing})}/>
                                                :
                                                <PencilSquare className={"edit-link"} onClick={() => this.setState({"firstname_editing": !this.state.firstname_editing})}/>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Adresse</strong></td>
                                        <td>{
                                            this.state.street_editing ?
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    min="3"
                                                    className={"w-50"}
                                                    onChange={e => {this.setState(this.checkData("street",e.target.value))}}
                                                    value={this.state.street}
                                                />
                                            :
                                                this.state.street
                                        }</td>
                                        <td>
                                            {this.state.street_editing ?
                                                <Check color={"green"} className={"edit-link"} onClick={() => this.setState({"street_editing": !this.state.street_editing})}/>
                                                :
                                                <PencilSquare className={"edit-link"} onClick={() => this.setState({"street_editing": !this.state.street_editing})}/>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Ville</strong></td>
                                        <td>{
                                            this.state.city_editing ?
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    min="3"
                                                    className={"w-50"}
                                                    onChange={e => {this.setState(this.checkData("city",e.target.value))}}
                                                    value={this.state.city}
                                                />
                                            :
                                                this.state.city
                                        }</td>
                                        <td>
                                            {this.state.city_editing ?
                                                <Check color={"green"} className={"edit-link"} onClick={() => this.setState({"city_editing": !this.state.city_editing})}/>
                                                :
                                                <PencilSquare className={"edit-link"} onClick={() => this.setState({"city_editing": !this.state.city_editing})}/>
                                            }
                                        </td>
                                    </tr>
                                    </tbody>
                            </Table>
                        </Form>
                    </Col>
                </Row>
            </Container>
            :
            null
        ;
    }
}

export default UserProfile;
