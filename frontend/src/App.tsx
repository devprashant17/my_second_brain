import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Dashboard from "./pages/Dashboard";
import AllContent from "./pages/AllContent";
import Categories from "./pages/Categories";
import Favourites from "./pages/Favourites";
import TagsPage from "./pages/TagsPage";
import SharedBrain from "./pages/Sharedbrain";

import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

export default function App() {
    const [open, setOpen] = useState(true);

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={ <SignUp /> } />
                <Route path="/dashboard" element={
                    <>
                        <Navbar />
                        <Sidebar open={open} setOpen={setOpen} />
                        <Dashboard open={open} />
                        <Footer />
                    </>} />
                <Route path="/content" element={
                    <>
                        <Navbar />
                        <Sidebar open={open} setOpen={setOpen} />
                        <AllContent open={open} />
                        <Footer />
                    </>} />
                <Route path="/categories" element={
                    <>
                        <Navbar />
                        <Sidebar open={open} setOpen={setOpen} />
                        <Categories open={open} />
                        <Footer />
                    </>} />
                <Route path="/favourites" element={
                    <>
                        <Navbar />
                        <Sidebar open={open} setOpen={setOpen} />
                        <Favourites open={open} />
                        <Footer />
                    </>} />
                <Route path="/tags" element={
                    <>
                        <Navbar />
                        <Sidebar open={open} setOpen={setOpen} />
                        <TagsPage open={open} />
                        <Footer />
                    </>} />
                <Route path="/shared" element={
                    <>
                        <Navbar />
                        <Sidebar open={open} setOpen={setOpen} />
                        <SharedBrain open={open} />
                        <Footer />
                    </>} />
            </Routes> 
        </BrowserRouter>
    );
}