import React, { useReducer } from "react";
import "./App.css";

interface Label {
  label: string;
  value: boolean;
}

type ActionToggleAll = {
  type: "toggleAll";
};

type ActionToggleOne = {
  type: "toggleOne";
  payload: {
    index: number;
  };
};

type LabelAction = ActionToggleAll | ActionToggleOne;

function reducer(state: Label[], action: LabelAction): Label[] {
  switch (action.type) {
    case "toggleAll":
      state.forEach((l) => (l.value = !l.value));
      return [...state];
    case "toggleOne":
      state[action.payload.index].value = !state[action.payload.index].value;
      return [...state];
    default:
      return state;
  }
}

const countries: Label[] = [
  { label: "India", value: false },
  { label: "USA", value: false },
  { label: "France", value: false },
];

function App() {
  const [state, dispatch] = useReducer(reducer, countries);

  return (
    <div>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                dispatch({
                  type: "toggleAll",
                })
              }
            />
            Select all
          </label>
        </li>
        {state.map((l, i) => (
          <li>
            <label>
              <input
                type="checkbox"
                checked={l.value}
                onChange={(_) =>
                  dispatch({
                    type: "toggleOne",
                    payload: { index: i },
                  })
                }
              />
              {l.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
