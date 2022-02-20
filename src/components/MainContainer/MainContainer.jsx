const MainContainer = ({ children }) => {
  return (
    <div className="bg-light p-4" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
};

export default MainContainer;
