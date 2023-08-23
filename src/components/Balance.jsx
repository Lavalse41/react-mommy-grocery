function Balance({ balance }) {
  return (
    <div className="balance-container">
      <p>เงินคงเหลือ</p>
      <h3 style={balance < 0 ? { color: "rgb(139, 21, 21)" } : {}}>
        {balance.toLocaleString()}
      </h3>
    </div>
  );
}

export default Balance;
