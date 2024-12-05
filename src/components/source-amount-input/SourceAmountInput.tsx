import { useState } from "react";
import { Form } from "react-bootstrap";

export const SourceAmountInput = () => {
  const [amount, setAmount] = useState<number>(0.0);

  const amountFilter = (amount: string) => {
    console.log(amount);
    setAmount(parseFloat(amount));
  };

  return (
    <Form.Control
      //   type="decimal"
      placeholder="0.0"
      value={amount}
      onChange={(e) => {
        amountFilter(e.target.value);
      }}
    />
  );
};
