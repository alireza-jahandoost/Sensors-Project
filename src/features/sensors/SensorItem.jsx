import { Container, Row, Col, Image, ProgressBar } from "react-bootstrap";
import { sensorTypes } from "./sensorTypes";

const SensorItem = ({ sensor }) => {
  const sensorInfo = sensorTypes[sensor.sensortype];
  return (
    <Container className="shadow border my-2 p-3 rounded">
      <Row>
        <Col xs={8}>
          <div>
            <p>{sensor.sensorname}</p>
            <p>
              <span>نوع سنسور: </span>
              <span>{sensorInfo.name}</span>
            </p>
          </div>
          <div>
            <ProgressBar
              now={sensor.sensordata}
              label={`${sensor.sensordata}%`}
            />
          </div>
        </Col>
        <Col xs={4}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <Image
              className=""
              src={sensorTypes[sensor.sensortype].imageSrc}
              alt={sensorTypes[sensor.sensortype].name}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SensorItem;
