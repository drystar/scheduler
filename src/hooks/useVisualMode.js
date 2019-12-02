// import { useState } from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(newMode, replace = false) {
//     if (replace) {
//       history.pop();
//       setHistory(prev => [...prev, mode]);
//     } else {
//       setHistory(prev => [...prev, mode]);
//     }
//     setMode(newMode);
//   }

//   function back() {
//     if (history.length > 1) {
//       history.pop();
//       setMode(history[history.length - 1]);
//     }
//   }

//   return { mode, transition, back };
// }

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }
  function back() {
    if (history.length === 1) {
      setMode(initial);
    } else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }
  return { mode, transition, back };
}
