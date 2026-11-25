import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Dashboard from "./pages/Dashboard";
import AllContent from "./pages/AllContent";
import Favourites from "./pages/Favourites";
import TagsPage from "./pages/TagsPage";
import SharedBrain from "./pages/Sharedbrain";

import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

import { BACKEND_URL } from "./config";

export default function App() {
    const [open, setOpen] = useState(true);
    const [contents, setContents] = useState<any[]>([]);

    async function refreshContent() {
        const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                token: localStorage.getItem("token") || ""
            }
        });
    
        const data = await response.json();

        setContents(data.content);
        console.log(contents);
     }

    useEffect(() => {
            refreshContent();
        }, []);

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={ <SignUp /> } />
                <Route path="/dashboard" element={
                    <>
                        <Navbar  refreshContent={refreshContent}/>
                        <Sidebar open={open} setOpen={setOpen} />
                        <Dashboard open={open}  contents={contents}  setContents={setContents}/>
                        <Footer />
                    </>} />
                <Route path="/content" element={
                    <>
                        <Navbar  refreshContent={refreshContent} />
                        <Sidebar open={open} setOpen={setOpen} />
                        <AllContent open={open}  contents={contents} setContents={setContents} />
                        <Footer />
                    </>} />
                <Route path="/favourites" element={
                    <>
                        <Navbar  refreshContent={refreshContent} />
                        <Sidebar open={open} setOpen={setOpen} />
                        <Favourites open={open}  contents={contents} setContents={setContents}/>
                        <Footer />
                    </>} />
                <Route path="/tags" element={
                    <>
                        <Navbar  refreshContent={refreshContent} />
                        <Sidebar open={open} setOpen={setOpen}  />
                        <TagsPage open={open} contents={contents} setContents={setContents}/>
                        <Footer />
                    </>} />
                <Route path="/shared" element={
                    <>
                        <Navbar  refreshContent={refreshContent} />
                        <Sidebar open={open} setOpen={setOpen} />
                        <SharedBrain open={open}  contents={contents} setContents={setContents}/>
                        <Footer />
                    </>} />
            </Routes> 
        </BrowserRouter>
    );
}