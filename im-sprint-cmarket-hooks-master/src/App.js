import React, { useState } from 'react';
import Nav from './components/Nav';
import ItemListContainer from './pages/ItemListContainer';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ShoppingCart from './pages/ShoppingCart';
import { initialState } from './assets/state';

function App() {

  const [items, setItems] = useState(initialState.items);
  const [cartItems, setCartItems] = useState(initialState.cartItems);
  const insertCartItem = (quantity, itemId) => {
    setCartItems([...cartItems, cartItems.filter((el) => el.itemId === handleClick(itemId))]);
  }
  const deleteCartItem = (itemId) => {
    setCartItems(cartItems.filter((el) => el.itemId !== itemId));
  } 

  return (
    <Router>
      <Nav cartItems={cartItems}/>
      <Switch>
        <Route exact={true} path="/">
          <ItemListContainer items={items}/>
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart cartItems={cartItems} items={items} insertCartItem={insertCartItem} deleteCartItem={deleteCartItem} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
