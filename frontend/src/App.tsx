import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Dashboard from "./pages/Dashboard";
import AllContent from "./pages/AllContent";
import Categories from "./pages/Categories";
import Favourites from "./pages/Favourites";
import TagsPage from "./pages/TagsPage";
import SharedBrain from "./pages/Sharedbrain";

import { BACKEND_URL } from "./config";

export default function App() {
    const [open, setOpen] = useState(true);

    return (
        <BrowserRouter>
            <Navbar />
            <Sidebar open={open} setOpen={setOpen} />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard open={open} />} />
                <Route path="/content" element={<AllContent open={open} />} />
                <Route path="/categories" element={<Categories open={open} />} />
                <Route path="/favourites" element={<Favourites open={open} />} />
                <Route path="/tags" element={<TagsPage open={open} />} />
                <Route path="/shared" element={<SharedBrain open={open} />} />
            </Routes>
            
            <Footer />
             <button
    onClick={async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/`);

            console.log("Status:", response.status);
            console.log("Response:", await response.text());

            if (response.ok) {
                console.log("Connected successfully!");
            } else {
                console.log("Backend responded, but with an error.");
            }
        } catch (error) {
            console.error("Connection failed:", error);
        }
    }}
    className="ml-[1000px] border-2"
>
    Test Backend
</button>
        </BrowserRouter>
    );
}