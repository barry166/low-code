const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "4px",
        backgroundColor: "#f5f5f5",
        height: "50px",
      }}
    >
      <div>Logo</div>
      <button>操作按钮</button>
    </div>
  );
};

export default Header;
