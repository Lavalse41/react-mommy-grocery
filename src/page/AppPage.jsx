import { useState, useContext } from "react";
import { imageSrc } from "../data/imageSrc.js";
import { UserInputContext } from "../App.jsx";
import Chatbox from "../components/Chatbox.jsx";
import Header from "../components/Header.jsx";
import Balance from "../components/Balance.jsx";
import Form from "../components/Form.jsx";
import GroceryList from "../components/GroceryList.jsx";
import Summary from "../components/Summary.jsx";
import ReactPaginate from "react-paginate";
import SortList from "../components/SortList.jsx";
import DisplayOption from "../components/DisplayOption.jsx";
import { mockData } from "../data/mockData.js";

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

  //sort Products
  const [sortBy, setSortBy] = useState("input");

  let sortedProducts;

  if (sortBy === "input") {
    sortedProducts = mockData;
  }

  if (sortBy === "alphabet") {
    sortedProducts = products
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "bought") {
    sortedProducts = mockData
      .slice()
      .sort((a, b) => Number(b.bought) - Number(a.bought));
  }

  //change display option
  const [displayOption, setDisplayOption] = useState("card");

  //set pagination
  const [productOffset, setProductOffset] = useState(0);

  let productsPerPage;
  displayOption === "card"
    ? (productsPerPage = 9)
    : displayOption === "list"
    ? (productsPerPage = 18)
    : "";

  const endOffset = productOffset + productsPerPage;
  const currentProducts = sortedProducts.slice(productOffset, endOffset);
  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);

  function handlePageClick(e) {
    const newOffset = (e.selected * productsPerPage) % sortedProducts.length;
    setProductOffset(newOffset);
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
            currentProducts={currentProducts}
            onAddQuantity={addQuantity}
            onSubtractQuantity={subtractQuantity}
            onDeleteProduct={deleteProduct}
            onToggleProduct={handleToggleProduct}
            displayOption={displayOption}
          />
          <div className="sort-checkout">
            <div style={{ display: "flex", gap: "20px" }}>
              <DisplayOption
                setDisplayOption={setDisplayOption}
                displayOption={displayOption}
              />
              <SortList setSortBy={setSortBy} />
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="pagination-container"
            />
            <button className="checkout-button" onClick={handleClearList}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppPage;
