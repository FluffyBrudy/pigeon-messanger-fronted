const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default LoadingScreen;
