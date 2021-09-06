import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screen/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./Screen/ProductScreen";

function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
