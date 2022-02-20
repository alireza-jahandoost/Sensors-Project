import React from "react";
import "./App.css";
import ActorsList from "./features/actors/ActorsList";
import SensorsList from "./features/sensors/SensorsList";
import { Container, Row, Col } from "react-bootstrap";
import MainContainer from "./components/MainContainer/MainContainer";

function App() {
  return (
    <MainContainer>
      <Container>
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <ActorsList />
          </Col>
          <Col lg={6} className="mb-4 mb-lg-0">
            <SensorsList />
          </Col>
        </Row>
      </Container>
    </MainContainer>
  );
}

export default App;
