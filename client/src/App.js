import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import TodoDetails from "./pages/TodoDetails/TodoDetails";
import ThemeContext, { themes } from "./ThemeContext";

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  return (
    <ThemeContext.Provider value={currentTheme}>
      <button onClick={() => setCurrentTheme(themes.dark)}>Change theme</button>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/todos/:todoId" component={TodoDetails}></Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
