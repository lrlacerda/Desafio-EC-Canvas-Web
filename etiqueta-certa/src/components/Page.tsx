import React from "react";
import ContentItem from "./ContentItem";
import { useDrop } from "react-dnd";
import "../styles/Page.css";

interface Item {
    text: string;
    image: string;
}

interface PageProps {
    pageIndex: number;
    items: Item[];
    setItems: (pageIndex: number, items: Item[]) => void;
    removePage: (index: number) => void;
    pages: Item[][];
    setPages: (pages: Item[][]) => void;
}

const Page: React.FC<PageProps> = ({
    pageIndex,
    items,
    setItems,
    removePage,
    pages,
    setPages,
}) => {
    const addItem = () => {
        const newItem: Item = {
            text: `Item ${items.length + 1}`,
            image: "default-image-url",
        };
        setItems(pageIndex, [...items, newItem]);
    };

    const [, dropRef] = useDrop({
        accept: "ITEM",
        drop: (draggedItem: { index: number; pageIndex: number }) => {
            if (draggedItem.pageIndex !== pageIndex) {
                const sourcePageIndex = draggedItem.pageIndex;
                const targetPageIndex = pageIndex;

                const sourceItems = [...pages[sourcePageIndex]];
                const [movedItem] = sourceItems.splice(draggedItem.index, 1);

                const targetItems = [...pages[targetPageIndex]];
                targetItems.push(movedItem);

                const updatedPages = [...pages];
                updatedPages[sourcePageIndex] = sourceItems;
                updatedPages[targetPageIndex] = targetItems;
                setPages(updatedPages);

                draggedItem.pageIndex = targetPageIndex;
                draggedItem.index = targetItems.length - 1;
            }
        },
    });

    // Função para remover item da página atual
    const removeItem = (itemIndex: number) => {
        const updatedItems = items.filter((_, i) => i !== itemIndex);
        const updatedPages = [...pages];
        updatedPages[pageIndex] = updatedItems;
        setPages(updatedPages); // Atualiza todas as páginas
    };

    return (
        <div ref={dropRef} className="page-container">
            <div className="page-header">
                <span>Página {pageIndex + 1}</span>
                <button
                    onClick={() => removePage(pageIndex)}
                    className="delete-page-button"
                >
                    🗑
                </button>
            </div>
            {items.map((item, index) => (
                <ContentItem
                    key={index}
                    itemIndex={index}
                    pageIndex={pageIndex}
                    items={items}
                    setItems={setItems}
                    removeItem={removeItem} // Passa a função removeItem
                    pages={pages}
                    setPages={setPages}
                />
            ))}
            <button onClick={addItem} className="add-item-button">
                + Novo item
            </button>
        </div>
    );
};

export default Page;
