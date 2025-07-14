import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center text-white">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <div className="text-8xl md:text-9xl font-bold mb-6 text-white drop-shadow-lg animate-pulse">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to={"/"}>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
              ← Go Home
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
