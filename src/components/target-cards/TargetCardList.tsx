import { Stack } from "react-bootstrap";
import { Exchange } from "../../interfaces/exchange.interface";
import { TargetCard } from "./TargetCard";

interface TargetCardsProps {
  targetCurrencies?: Exchange[];
}

export const TargetCardList = ({ targetCurrencies }: TargetCardsProps) => {
  return (
    <Stack>
      {targetCurrencies
        ? targetCurrencies.map((currency, index) => (
            <TargetCard {...currency.targetFinancial} key={index} />
          ))
        : Array(5)
            .fill(1)
            .map((_, index) => <TargetCard key={index} />)}
    </Stack>
  );
};
