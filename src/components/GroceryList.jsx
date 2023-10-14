import Item from "../components/Item.jsx";

function GroceryList({
  currentProducts,
  onAddQuantity,
  onSubtractQuantity,
  onDeleteProduct,
  onToggleProduct,
  displayOption,
}) {
  return (
    <div className="grocery-list">
      {currentProducts.map((item, index) => (
        <Item
          key={item.id}
          item={item}
          index={index}
          onAddQuantity={onAddQuantity}
          onSubtractQuantity={onSubtractQuantity}
          onDeleteProduct={onDeleteProduct}
          onToggleProduct={onToggleProduct}
          displayOption={displayOption}
        />
      ))}
    </div>
  );
}

export default GroceryList;
