import { useState, useContext } from "react";
import { imageSrc } from "../data/imageSrc.js";
import { UserInputContext } from "../App.jsx";
import Chatbox from "../components/Chatbox.jsx";
import Header from "../components/Header.jsx";
import Balance from "../components/Balance.jsx";
import Form from "../components/Form.jsx";
import GroceryList from "../components/GroceryList.jsx";
import Summary from "../components/Summary.jsx";

function AppPage() {
  const [products, setProducts] = useState([]);

  //add product to list
  function addProduct(newProduct) {
    setProducts([...products, newProduct]);
  }

  //toggle bought or not
  function handleToggleProduct(id) {
    setProducts((products) =>
      products.map((product) =>
        product.id === id ? { ...product, bought: !product.bought } : product
      )
    );
  }

  //delete product
  function deleteProduct(index) {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  }

  //add product quantity
  function addQuantity(index) {
    const newProducts = [...products];
    newProducts[index].quantity++;
    setProducts(newProducts);
  }

  //subtract product quantity
  function subtractQuantity(index) {
    const newProducts = [...products];
    if (newProducts[index].quantity !== 1) {
      newProducts[index].quantity--;
      setProducts(newProducts);
    }
  }

  //calculate balance and total price
  const context = useContext(UserInputContext);
  let balance = Number(context.userBudget);

  const newProducts = [...products];
  const boughtProducts = newProducts.filter((item) => item.bought === true);
  const totalPrice = boughtProducts.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  balance = balance - totalPrice;

  //clear all products
  function handleClearList() {
    setProducts([]);
  }

  return (
    <div className="app">
      <div>
        <Chatbox />
        <Summary
          totalPrice={totalPrice}
          balance={balance}
          boughtProducts={boughtProducts}
        />
      </div>
      <div className="form">
        <img id="backpages" src={imageSrc.backpage}></img>
        <div>
          <img id="balance-stamp" src={imageSrc.circle}></img>
          <Balance balance={balance} />
        </div>
        <div id="form-paper">
          <Header />
          <Form onAddProduct={addProduct} />
          <GroceryList
            products={products}
            onAddQuantity={addQuantity}
            onSubtractQuantity={subtractQuantity}
            onDeleteProduct={deleteProduct}
            onToggleProduct={handleToggleProduct}
            onClearList={handleClearList}
          />
        </div>
      </div>
    </div>
  );
}

export default AppPage;
