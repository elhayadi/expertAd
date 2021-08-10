import React, {Component} from "react";
import {AuthContext} from "../context/AuthContext";
import socket from "../context/SocketIOInstance";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Container, Table} from "react-bootstrap";

class UserBills extends Component {

    /**
     * Contexte d'authentification
     */
    static contextType = AuthContext;

    constructor(props, context) {
        super(props, context);

        /**
         * Initialisation de l'état
         */
        this.state = {
            bills: [],
            loaded: false,
        };

        this.formatDate = this.formatDate.bind(this);

        this._isMounted = false;
    }

    /**
     * Rafraichir la liste des factures
     */
    refreshBills() {
        socket.emit("user_bills", this.context.mail);
        socket.on('user_bills_res', (bills) => {
            if (this._isMounted) this.setState({ "bills": bills, "loaded": true});
        });
    }

    /**
     * Fonction s'activant a l'initialisation du composant
     */
    componentDidMount() {
        this._isMounted = true;
        this.refreshBills();
    }

    /**
     * Destruction du composant
     */
    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Formatter une date
     * @param date
     */
    formatDate(date) {
        const newdate = new Date(date.toString());
        return newdate.toLocaleDateString();
    }

    render() {
        return (
            <Container fluid className={"mt-4"}>
                <Row>
                    <Col className={"text-center mb-4 col-12"}>
                        <h1>Vos factures</h1>
                    </Col>
                    {this.state.loaded ?
                        this.state.bills.length === 0 ?
                        <Col className="col-12 text-center mt-5 fade-effect">
                            <h3 className={"text-grey"}>Aucune facture disponible.</h3>
                        </Col>
                        :
                        <Col className={"m-0 px-4 mb-4 w-100 col-12 fade-effect"}>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>Réservation</th>
                                    <th>Montant TOTAL</th>
                                    <th>Statut</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.bills.map((bill, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                (Chambre {bill.reservation.roomtype.name})
                                                - Du {this.formatDate(bill.reservation.arrival_date)} au {this.formatDate(bill.reservation.exit_date)}
                                            </td>
                                            <td>{bill.amount}€</td>
                                            <td className={bill.reservation.is_cancelled && bill.reservation.is_payed ? "text-primary" : bill.is_payed ? "text-success" : "text-danger"}>{
                                                bill.reservation.is_cancelled && bill.reservation.is_payed ? "Remboursée" : bill.is_payed ? "Payée" : "Attente paiement"
                                            }</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Col>
                        :
                        null
                    }
                </Row>
            </Container>
        );
    }
}

export default UserBills;
