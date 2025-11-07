// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import SongsPage from "./pages/SongsPage";
// import PlaylistPage from "./pages/PlaylistPage";
// import { PlayerProvider } from "./context/PlayerContext";
// import GlobalPlayer from "./components/GlobalPlayer";

// function App() {
//   return (
//     <PlayerProvider>
//       <BrowserRouter>
//         <nav className="bg-gray-800 text-white p-4 flex gap-4">
//           <Link to="/">Songs</Link>
//           <Link to="/playlists">Playlists</Link>
//         </nav>
//         <Routes>
//           <Route path="/" element={<SongsPage />} />
//           <Route path="/playlists" element={<PlaylistPage />} />
//         </Routes>
//         <GlobalPlayer />
//       </BrowserRouter>
//     </PlayerProvider>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SongsPage from "./pages/SongsPage";
import PlaylistPage from "./pages/PlaylistPage";
import { PlayerProvider } from "./context/PlayerContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import GlobalPlayer from "./components/GlobalPlayer";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="backdrop-blur-md bg-white/10 dark:bg-gray-900/80 
                 text-gray-900 dark:text-white p-4 flex justify-between items-center shadow-md"
    >
      <div className="flex gap-6 text-lg font-semibold">
        <Link
          to="/"
          className="hover:text-blue-500 transition-colors"
        >
          Songs
        </Link>
        <Link
          to="/playlists"
          className="hover:text-blue-500 transition-colors"
        >
          Playlists
        </Link>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
      </button>
    </nav>
  );
}

function AppContent() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-24">
          <Routes>
            <Route path="/" element={<SongsPage />} />
            <Route path="/playlists" element={<PlaylistPage />} />
          </Routes>
        </main>
        <GlobalPlayer />
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
