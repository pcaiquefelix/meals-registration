const MainLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 maintransition:px-36 px-6 py-20">
      {children}
    </main>
  );
};

export default MainLayout;
