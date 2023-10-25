import { useState, useContext, useEffect } from "react";
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
    sortedProducts = products;
    // sortedProducts = mockData;
  }

  if (sortBy === "alphabet") {
    sortedProducts = products
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "bought") {
    sortedProducts = products
      .slice()
      .sort((a, b) => Number(b.bought) - Number(a.bought));
  }

  //change display option
  const [displayOption, setDisplayOption] = useState("card");

  //set pagination
  const [productOffset, setProductOffset] = useState(0);
  const [isTablet, setIsTablet] = useState(
    window.matchMedia("(max-width: 1200px)").matches
  );
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(max-width: 1799px)").matches
  );
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 1800px)").matches
  );

  const handleMobile = (event) => {
    setIsMobile(event.matches);
  };

  const handleTablet = (event) => {
    setIsTablet(event.matches);
  };

  const handleLargeScreen = (event) => {
    setIsLargeScreen(event.matches);
  };

  const handleDesktop = (event) => {
    setIsDesktop(event.matches);
  };

  useEffect(() => {
    // const mediaQueryMobile = window.matchMedia("(max-width: 767px)");
    const mediaQueryTablet = window.matchMedia("(max-width: 1200px)");
    const mediaQueryLargeScreen = window.matchMedia("(min-width: 1800px)");
    const mediaQueryDesktop = window.matchMedia("(max-width: 1799px)");

    const addListeners = () => {
      // mediaQueryMobile.addListener(handleMobile);
      mediaQueryTablet.addListener(handleTablet);
      mediaQueryLargeScreen.addListener(handleLargeScreen);
      mediaQueryDesktop.addListener(handleDesktop);
    };

    const removeListeners = () => {
      // mediaQueryMobile.removeListener(handleMobile);
      mediaQueryTablet.removeListener(handleTablet);
      mediaQueryLargeScreen.removeListener(handleLargeScreen);
      mediaQueryDesktop.removeListener(handleDesktop);
    };

    addListeners();

    return () => {
      removeListeners();
    };
  }, []);

  let productsPerPage;

  if (displayOption === "card") {
    isTablet
      ? (productsPerPage = 6)
      : isLargeScreen || isDesktop
      ? (productsPerPage = 9)
      : "";
  } else if (displayOption === "list") {
    isTablet
      ? (productsPerPage = 18)
      : isLargeScreen || isDesktop
      ? (productsPerPage = 27)
      : "";
  }

  const endOffset = productOffset + productsPerPage;
  const currentProducts = sortedProducts.slice(productOffset, endOffset);
  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);

  function handlePageClick(e) {
    const newOffset = (e.selected * productsPerPage) % sortedProducts.length;
    setProductOffset(newOffset);
  }
  console.log(typeof productsPerPage);
  console.log(productsPerPage);
  console.log("isMobile", isMobile);
  console.log("isMobile", window.matchMedia("(max-width: 767px)").matches);
  console.log("isLargeScreen".isLargeScreen);
  console.log(
    "isLargeScreen",
    window.matchMedia("(min-width: 1800px)").matches
  );
  console.log("isTablet", isTablet);
  console.log("isTablet", window.matchMedia("(max-width: 1200px)").matches);

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
        <div id="backpages1"></div>
        <div id="backpages2"></div>
        <div className="balance-wrapper">
          <img id="balance-stamp" src={imageSrc.circle}></img>
          <Balance balance={balance} />
        </div>
        <div id="form-paper">
          <div>
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
          </div>
          <div className="sort-checkout">
            <div className="option-wrapper">
              <DisplayOption
                setDisplayOption={setDisplayOption}
                displayOption={displayOption}
              />
              <SortList setSortBy={setSortBy} />
            </div>
            <div className="pagination-sort-wrapper">
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
              <button className="clear-button" onClick={handleClearList}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppPage;
