import { useEffect, useState } from "react";
import "./App.css";
import { Financial } from "./interfaces/financial.interface";
import axios from "axios";
import { CurrencyCard } from "./components/currency-card/CurrencyCard";
import { Exchange } from "./interfaces/exchange.interface";
import { TargetCardList } from "./components/target-cards/TargetCardList";
import { SourceAmountInput } from "./components/source-amount-input/SourceAmountInput";
import { SourceCurrenciesOffcanvas } from "./components/source-currencies-offcanvas/SourceCurrenciesOffcanvas";

const apiUrl: string = process.env.REACT_APP_API_URL!;

function App() {
  const [sourceCurrencyId, setSourceCurrencyId] = useState<number>(1);
  const [sourceCurrency, setSourceCurrency] = useState<Financial>({});
  const [sourceCurrencies, setSourceCurrencies] = useState<Financial[]>([{}]);
  const [targetCurrencies, setTargetCurrencies] = useState<Exchange[]>([]);
  const [toggleOffcanvas, setToggleOffcanvas] = useState<() => void>(() => {});

  const fetchSourcecurrency = async (): Promise<void> => {
    try {
      const response = await axios.get<Financial>(
        `${apiUrl}/financial/${sourceCurrencyId}`
      );
      setSourceCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSourcecurrencies = async (): Promise<void> => {
    try {
      const response = await axios.get<Financial[]>(
        `${apiUrl}/financial/all/${sourceCurrencyId}`
      );
      setSourceCurrencies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTargetCurrencies = async () => {
    try {
      const response = await axios.get<Exchange[]>(
        `${apiUrl}/exchange/${sourceCurrencyId}`
      );
      setTargetCurrencies(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSourcecurrency();
    fetchTargetCurrencies();
    fetchSourcecurrencies();
  }, [sourceCurrencyId]);

  return (
    <div className="App">
      <CurrencyCard
        toggleOffcanvas={toggleOffcanvas}
        switchCurrencyid={setSourceCurrencyId}
        {...sourceCurrency}
      />
      <SourceAmountInput />
      <TargetCardList targetCurrencies={targetCurrencies} />
      <SourceCurrenciesOffcanvas
        switchCurrencyId={setSourceCurrencyId}
        setToggleOffcanvas={setToggleOffcanvas}
        sourceCurrencies={sourceCurrencies}
      />
    </div>
  );
}

export default App;
