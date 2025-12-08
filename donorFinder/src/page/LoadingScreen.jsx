function LoadingScreen() {
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center justify-center bg-white">
      <div className="h-16 w-16 bg-red-500 rounded-full animate-ping"></div>
      <p className="text-gray-700 text-lg font-semibold">Please wait...</p>
    </div>
  );
}

export default LoadingScreen;
