import { Col, Container, Row, Spinner } from "react-bootstrap";
import style from "./CurrencyCard.module.css";

interface CurrencyCardPorps {
  switchCurrencyid: (id: number) => void;
  toggleOffcanvas: () => void;
  id?: number;
  name?: string;
  currencyName?: string;
}

export const CurrencyCard = (props: CurrencyCardPorps) => {
  const { id, name, currencyName, toggleOffcanvas, switchCurrencyid } = props;

  const onClick = () => {
    toggleOffcanvas();
    if (id) switchCurrencyid(id);
  };

  return (
    <>
      <Container onClick={onClick} className={`${style.sourceCard}`}>
        <Row>
          <Col className="text-start">
            {name ? name : <Spinner animation="border" variant="primary" />}
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            {currencyName ? (
              currencyName
            ) : (
              <Spinner animation="border" variant="primary" />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
