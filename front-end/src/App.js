import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screen/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
