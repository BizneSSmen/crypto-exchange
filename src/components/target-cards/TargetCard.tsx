import { Col, Container, Row, Spinner } from "react-bootstrap";

interface TargetCardProps {
  id?: number;
  name?: string;
  currencyName?: string;
}

export const TargetCard = (props: TargetCardProps) => {
  const { name, currencyName } = props;
  return (
    <Container>
      <Row>
        <Col>
          {name ? name : <Spinner animation="border" variant="primary" />}
        </Col>
        <Col>
          {currencyName ? (
            currencyName
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Col>
      </Row>
    </Container>
  );
};
