//https://codesandbox.io/s/sweet-nash-gwgejg?file=/src/App.js

import { useEffect, useMemo, useState } from "react";
import "./styles.css";

export default function App() {
  const [num, setNum] = useState(2);
  const [theme, setTheme] = useState(false);

  const memoized = useMemo(() => {
    return slowFunc(num);
  }, [num]);

  //with every re-render, new themeStyle object will be created, with a fresh new refrence
  // const themeStyle = {
  //   backgroundColor: theme ? "black" : "white",
  //   color: theme ? "white" : "black"
  // };

  const memoizedTheme = useMemo(() => {
    return {
      backgroundColor: theme ? "black" : "white",
      color: theme ? "white" : "black"
    };
  }, [theme]);

  //refrential equality
  useEffect(() => {
    console.log("Theme changed");
  }, [memoizedTheme]);

  return (
    <div className="App">
      <h1>Interview questions</h1>
      <input type="number" onChange={(e) => setNum(e.target.value)} />

      <button onClick={() => setTheme(!theme)}>Theme</button>
      <div style={memoizedTheme}>{memoized}</div>
    </div>
  );
}

const slowFunc = (num) => {
  //heavy computations...
  console.log(num * 2);
  return num * 2;
};


//useMemo is basically used for memoization
//if we have a slow function doing some heavy computations, we donot want it to run on each re render
//so we can wrap it in useMemo so that it only runs if the dependency array value is changed.

//second use case is refrential equality, if we have an object, then with each re-render,
//a new refrence is created for that object, in order to avoid that, we can wrap that object,
//into useMemo, to make sure we update the refrence of the object, whenever the actual
//content of that object is changed.