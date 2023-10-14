function Header() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return (
    <div className="header">
      <div>
        <h1>Notes</h1>
        <h2>อย่าลืมซื้อของให้แม่ที่ตลาดด้วย</h2>
      </div>
      <p>{formattedDate} BE</p>
    </div>
  );
}

export default Header;
