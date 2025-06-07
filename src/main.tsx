import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import RoadTo2026 from "./pages/road-to-2026.tsx";
import Map from "./pages/map.tsx";
import Carousel from "./pages/carousel.tsx";
import Stream from "./pages/stream.tsx";
import Navbar from "./components/navbar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* Navbar */}
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/road-to-2026" element={<RoadTo2026 />} />
          <Route path="/map" element={<Map />} />
          <Route path="/watch-carousel" element={<Carousel />} />
          <Route path="/watch-stream" element={<Stream />} />
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/:path" element={<div>404 Not Found</div>} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
