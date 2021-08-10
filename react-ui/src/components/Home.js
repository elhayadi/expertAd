import {Container, Row, Col} from "react-bootstrap";
import React, {Component} from "react";
import {AuthContext} from "../context/AuthContext";
import HotelRooms from "./HotelRooms";

class Home extends Component {
    /**
     * Contexte d'authentification
     */
    static contextType = AuthContext;

    render() {
        const auth = this.context;

        return (
            auth.loaded ?
                auth.authenticated ?
                    <HotelRooms auth={auth.authenticated}/>
                :
                    <Container fluid className={"flex-center full-height"}>
                        <Row className="justify-content-md-center">
                            <Col className="col-12 text-center">
                                <h1 className="display-3">Bienvenue</h1>
                            </Col>
                            <Col className="col-12 text-center">
                                <h3 className="text-muted">Connectez-vous pour réserver voir nos services.</h3>
                            </Col>
                        </Row>
                    </Container>
            :
            null
        );
    }
}

export default Home;
