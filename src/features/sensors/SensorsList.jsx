import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSensors,
  sensorsDataSelector,
  sensorsStatusSelector,
} from "./sensorsSlice";
import Spinner from "../../components/Spinner/Spinner";
import SensorItem from "./SensorItem";
import { Container } from "react-bootstrap";

const SensorsList = () => {
  const dispatch = useDispatch();
  const sensorsStatus = useSelector(sensorsStatusSelector);
  const sensorsData = useSelector(sensorsDataSelector);

  useEffect(() => {
    dispatch(fetchSensors());
  }, [dispatch]);

  const content = (() => {
    switch (sensorsStatus) {
      case "fulfilled": {
        const Items = sensorsData.map((sensor) => (
          <SensorItem key={sensor.sensorid} sensor={sensor} />
        ));

        return <div>{Items}</div>;
      }
      case "rejected": {
        return <div>خطا در برقراری ارتباط با سرور. لطفا مجددا تلاش کنید.</div>;
      }
      default: {
        return (
          <div className="text-center">
            <Spinner />
          </div>
        );
      }
    }
  })();

  return (
    <Container className="bg-white p-4 shadow rounded border h-100">
      <h2 className="display-6 mb-4 text-center">سنسورها</h2>
      {content}
    </Container>
  );
};

export default SensorsList;
