import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActors,
  actorsDataSelector,
  actorsStatusSelector,
} from "./actorsSlice";
import Spinner from "../../components/Spinner/Spinner";
import ActorItem from "./ActorItem";
import { Container } from "react-bootstrap";

const ActorsList = () => {
  const dispatch = useDispatch();
  const actorsStatus = useSelector(actorsStatusSelector);
  const actorsData = useSelector(actorsDataSelector);

  useEffect(() => {
    dispatch(fetchActors());
  }, [dispatch]);

  const content = (() => {
    switch (actorsStatus) {
      case "fulfilled": {
        const Items = actorsData.map((actor) => (
          <ActorItem key={actor.actorid} actor={actor} />
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
    <Container className="bg-white p-4 shadow rounded border">
      <h2 className="display-6 mb-4 text-center">اکتورها</h2>
      {content}
    </Container>
  );
};

export default ActorsList;
