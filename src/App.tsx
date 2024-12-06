import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import fetchCard from "./assets/fetchCard";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    setCardId;
  }, []);

  const [cardId, setCardId] = useState("");
  const [cardData, setCardData] = useState<any>(null); // Type is any for now

  const handleFetchCard = async () => {
    if (cardId) {
      const data = await fetchCard(cardId);
      setCardData(data); // Now you can update state with the response data
    } else {
      console.log("Please provide a card ID");
    }
  };

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <div>
      <input
        type="text"
        value={cardId}
        onChange={(e) => setCardId(e.target.value)}
        placeholder="Enter Card ID"
      />
      <button onClick={handleFetchCard}>Fetch Card</button>
      {cardData && <pre>{JSON.stringify(cardData, null, 2)}</pre>}
    </div>
  );
}
export default App;
