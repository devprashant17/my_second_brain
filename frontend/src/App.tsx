import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

import Dashboard from "./pages/Dashboard";
import AllContent from "./pages/AllContent";
import Categories from "./pages/Categories";
import Favourites from "./pages/Favourites";
import TagsPage from "./pages/TagsPage";
import SharedBrain from "./pages/Sharedbrain";

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
        </BrowserRouter>
    );
}