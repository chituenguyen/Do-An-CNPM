import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screen/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./Screen/ProductScreen";
import CartScreen from "./Screen/CartScreen";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import ShippingScreen from "./Screen/ShippingScreen";
import PlaceOrderScreen from "./Screen/PlaceOrdeScreenr";
import OrderScreen from "./Screen/OrderScreen";
import AdminProductListScreen from "./Screen/AdminProductListScreen";
import Payment from "./Screen/Payment";

//Hello

function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/login/" component={LoginScreen} />
          <Route path="/register/" component={RegisterScreen} />
          <Route path="/shipping/" component={ShippingScreen} />
          <Route path="/placeorder/" component={PlaceOrderScreen} />
          <Route path="/order/:id/" component={OrderScreen} />
          <Route
            path="/admin/productlist/"
            component={AdminProductListScreen}
          ></Route>
          <Route path="/profile/" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/payment" component={Payment} />
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
