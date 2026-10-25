import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Friendship from "./pages/Friendship";
import Gallery from "./pages/Gallery";
import WhatsNext from "./pages/WhatsNext";
import Updates from "./pages/Updates";
import BookMeeting from "./pages/BookMeeting";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-rose-50 text-rose-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/friendship" element={<Friendship />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/whats-next" element={<WhatsNext />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/book" element={<BookMeeting />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
