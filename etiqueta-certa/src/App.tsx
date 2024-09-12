import React from "react";
import Canvas from "./components/Canvas";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="content-wrapper">
                <DndProvider backend={HTML5Backend}>
                    <Canvas />
                </DndProvider>
            </div>
            <Footer />
        </div>
    );
}

export default App;
