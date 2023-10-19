import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>hi , this is Amirali , just for test</p>
        <Link to={"/user"}> user</Link>
      </header>
    </div>
  );
}

export default App;
