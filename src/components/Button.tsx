import { useState } from "react";

export function Button() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(
      counter + 1
    );
  }

  function decrement() {
    setCounter(
      counter - 1
    );
  }

  return (
    <button onClick={increment} onAuxClick={decrement}>
      {counter}
    </button>
  );
}