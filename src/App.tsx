import { useEffect, useState } from "react";
import { Clients } from "./services/api/client";
import { Policies } from "./services/api/policy";

type Client = {
  account: string;
  document: string;
  name: string;
  policyId: number;
  status: string;
};

export default function App() {
  const [results, setResults] = useState<Client[]>([]);
  const [error, setError] = useState<Error>({} as Error);

  useEffect(() => {
    (async () => {
      const { results, error } = await Clients.search("1");

      setResults(results);
      setError(error);
    })();
  }, []);

  const newPolicy = {
    name: "Testezi",
    parentId: 1,
    parameters: [
      {
        market: "FRA",
        name: "MarginByContract",
        symbol: "",
        value: 200,
      },
    ],
  };

  function handleNewPolicy() {
    Policies.create(newPolicy);
  }

  if (error.message) <p>Ocorreu um erro</p>;

  return (
    <div className="App">
      {results?.map((client) => (
        <div>{client.document}</div>
      ))}

      <button type="button" onClick={handleNewPolicy}>
        Cadastrar Política
      </button>
    </div>
  );
}
