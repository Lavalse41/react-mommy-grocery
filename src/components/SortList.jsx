function SortList({ setSortBy }) {
  return (
    <select className="sort" onChange={(e) => setSortBy(e.target.value)}>
      <option value="input">เรียงตามลำดับ</option>
      <option value="alphabet">เรียงตามตัวอักษร</option>
      <option value="bought">เรียงตามสถานะ</option>
    </select>
  );
}

export default SortList;
