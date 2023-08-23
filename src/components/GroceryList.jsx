import { useState } from "react";
import Item from "../components/Item.jsx";
import SortList from "../components/SortList.jsx";

function GroceryList({
  products,
  onAddQuantity,
  onSubtractQuantity,
  onDeleteProduct,
  onToggleProduct,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedProducts;

  if (sortBy === "input") {
    sortedProducts = products;
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

  return (
    <div>
      <div className="grocery-list">
        {sortedProducts.map((item, index) => {
          return (
            <Item
              key={item.id}
              item={item}
              index={index}
              onAddQuantity={onAddQuantity}
              onSubtractQuantity={onSubtractQuantity}
              onDeleteProduct={onDeleteProduct}
              onToggleProduct={onToggleProduct}
            />
          );
        })}
      </div>
      <div className="sort-checkout">
        <div>back forth</div>
        <SortList setSortBy={setSortBy} />
        <button className="checkout-button" onClick={onClearList}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default GroceryList;
