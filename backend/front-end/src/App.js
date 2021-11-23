import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screen/HomeScreen";
import { HashRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./Screen/ProductScreen";
import CartScreen from "./Screen/CartScreen";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import ShippingScreen from "./Screen/ShippingScreen";
import PlaceOrderScreen from "./Screen/PlaceOrdeScreenr";
import OrderScreen from "./Screen/OrderScreen";
import Payment from "./Screen/Payment";
import AdminListOrder from "./Screen/AdminListOrder";
import AdminListUser from "./Screen/AdminListUser";
import AdminListProduct from "./Screen/AdminListProduct";
import AdminEditProduct from "./Screen/AdminEditProduct";

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
          <Route path="/profile/" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/payment" component={Payment} />
          <Route path="/admin/order" component={AdminListOrder} />
          <Route path="/admin/users" component={AdminListUser} />
          <Route path="/admin/products" component={AdminListProduct} />
          <Route path="/admin/product/edit/:id?" component={AdminEditProduct} />
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
