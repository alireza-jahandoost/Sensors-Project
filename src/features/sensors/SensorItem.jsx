import { Container, Row, Col, Image } from "react-bootstrap";
import { sensorTypes } from "./sensorTypes";
import { Progress } from "antd";

const SensorItem = ({ sensor }) => {
  const sensorInfo = sensorTypes[sensor.sensortype];

  const percentOfProgress =
    sensorInfo.showType === "percent"
      ? sensor.sensordata
      : (sensor.sensordata / (sensorInfo.maximum - sensorInfo.minimum)) * 100;

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
            <Progress
              format={(percent) =>
                sensorInfo.showType === "percent"
                  ? `${percent}%`
                  : `${sensor.sensordata}/${sensorInfo.maximum}`
              }
              percent={percentOfProgress}
              status="normal"
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
