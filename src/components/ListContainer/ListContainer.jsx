import { Container } from "react-bootstrap";

const ListContainer = ({ children }) => {
  return (
    <Container className="bg-white p-4 shadow rounded border h-100">
      {children}
    </Container>
  );
};

export default ListContainer;
