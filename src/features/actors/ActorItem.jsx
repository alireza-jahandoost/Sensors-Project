import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeActorStatus } from "./actorsSlice";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-toastify";

const ActorItem = ({ actor }) => {
  const dispatch = useDispatch();

  const off = "خاموش";
  const on = "روشن";

  const handleChangeStatus = () => {
    const newStatus = actor.actorstatus === 0 ? 1 : 0;
    dispatch(
      changeActorStatus({ actorId: actor.actorid, actorStatus: newStatus })
    )
      .unwrap()
      .then(({ actorid, actorstatus }) => {
        const message = `${actor.actorname} با موفقیت ${
          actorstatus === 0 ? off : on
        } شد.`;
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(() => {
        toast.error("خطا در برقراری ارتباط با سرور.", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  return (
    <Container className="shadow border my-2 p-3 rounded">
      <Row>
        <Col xs={8}>
          <div>
            <p>{actor.actorname}</p>
            <p>
              <span>وضعیت اکتور: </span>
              <span>{actor.actorstatus === 0 ? off : on}</span>
            </p>
          </div>
        </Col>
        <Col xs={4}>
          <div className="d-flex justify-content-end align-items-end h-100">
            <Button
              disabled={actor.isLoading}
              className="fw-bold"
              onClick={handleChangeStatus}
              style={{ width: "120px", height: "40px" }}
              variant={
                actor.isLoading
                  ? "secondary"
                  : actor.actorstatus === 0
                  ? "success"
                  : "danger"
              }
            >
              {actor.isLoading ? (
                <Spinner />
              ) : (
                <span>{actor.actorstatus === 0 ? on : off} کردن</span>
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ActorItem;
