//https://codesandbox.io/s/condescending-field-kz7ssm?file=/src/App.js

import { useState, useCallback } from "react";
import { List } from "./List";
import "./styles.css";

export default function App() {
  const [num, setNum] = useState(1);
  const [theme, setTheme] = useState(false);

  const themeStyle = {
    backgroundColor: theme ? "white" : "black",
    color: theme ? "black" : "white"
  };

  //getting recreated with every re-render
  // const showItemsSlow = () => {
  //   console.log("Hii");
  //   return [num, num + 1, num + 2];
  // };

  const showItemsFast = useCallback((param) => {
    console.log("Hii from useCallback");
    return [num, num + 1, num + 2];
  }, [num]);

  return (
    <div className="App">
      <h1>Learn useCallback with me</h1>

      <br />
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />
      <br />
      <div style={themeStyle}>{num}</div>
      <button onClick={() => setTheme(!theme)}>Change Theme</button>
      <List showList={showItemsFast} />
    </div>
  );
}


//---------------------------------------------------------------------------------------
//List.js
import { useEffect, useState } from "react";

export const List = ({ showList }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(showList(5));
  }, [showList]);

  return items.map((item, i) => <p key={i}>{item}</p>);
};


//useCallback is similar to useMemo, will not run unless the value in dependency array is changed
//useCallback returns and stores the function in the variable
//since it returns a function itself, we can pass parameter to it as well