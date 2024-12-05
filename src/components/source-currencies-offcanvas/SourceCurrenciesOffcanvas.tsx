import { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { Financial } from "../../interfaces/financial.interface";
import { CurrencyCard } from "../currency-card/CurrencyCard";
import style from "./SourceCurrenciesOffcanvas.module.css";

interface SourceCurrenciesOffcanvasProps {
  switchCurrencyId: (id: number) => void;
  setToggleOffcanvas: React.Dispatch<React.SetStateAction<() => void>>;
  sourceCurrencies?: Financial[];
}

export const SourceCurrenciesOffcanvas = ({
  setToggleOffcanvas,
  sourceCurrencies,
  switchCurrencyId,
}: SourceCurrenciesOffcanvasProps) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setToggleOffcanvas(() => () => setShow((prev) => !prev));
  }, [setToggleOffcanvas]);

  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        className={`${style.sourceOffcanvas}`}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Source currency</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={4}>
            {sourceCurrencies
              ? sourceCurrencies.map((currency, index) => (
                  <CurrencyCard
                    switchCurrencyid={switchCurrencyId}
                    toggleOffcanvas={() => () => setShow((prev) => !prev)}
                    {...currency}
                    key={index}
                  />
                ))
              : Array(5)
                  .fill(1)
                  .map((_, index) => (
                    <CurrencyCard
                      switchCurrencyid={switchCurrencyId}
                      key={index}
                      toggleOffcanvas={() => () => setShow((prev) => !prev)}
                    />
                  ))}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
