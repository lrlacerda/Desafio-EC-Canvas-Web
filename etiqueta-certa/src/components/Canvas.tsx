import React, { useState } from "react";
import Page from "./Page";
import "../styles/Canvas.css";

interface Item {
    text: string;
    image: string;
}

const Canvas: React.FC = () => {
    const [pages, setPages] = useState<Item[][]>([[]]); // Array de páginas, cada página é um array de itens
    const [zoom, setZoom] = useState(1); // Adicionando estado para zoom

    const addPage = () => {
        setPages([...pages, []]); // Adiciona uma nova página
    };

    const removePage = (pageIndex: number) => {
        const updatedPages = pages.filter((_, index) => index !== pageIndex);
        setPages(updatedPages);
    };

    const setItems = (pageIndex: number, items: Item[]) => {
        const updatedPages = [...pages];
        updatedPages[pageIndex] = items;
        setPages(updatedPages);
    };

    // Funções para aumentar e diminuir o zoom
    const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2)); // Máximo de zoom 2x
    const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5)); // Mínimo de zoom 0.5x

    return (
        <div
            className="canvas-container"
            style={{
                position: "relative",
                transform: `scale(${zoom})`,
                transformOrigin: "0 0",
            }}
        >
            {pages.map((items, pageIndex) => (
                <Page
                    key={pageIndex}
                    pageIndex={pageIndex}
                    items={items}
                    setItems={setItems}
                    removePage={removePage}
                    pages={pages} // Passe pages
                    setPages={setPages} // Passe setPages
                />
            ))}
            <button onClick={addPage} className="add-page-button">
                + Nova Página
            </button>
            <div className="zoom-controls">
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
            </div>
        </div>
    );
};

export default Canvas;
