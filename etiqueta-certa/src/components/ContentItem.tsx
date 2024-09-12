import React, { useState, useCallback } from "react";
import { Rnd, RndResizeCallback } from "react-rnd";
import { useDrag, useDrop } from "react-dnd";
import "../styles/ContentItem.css";
import fixedImage from "../assets/images/image2.jpg";

interface Size {
    width: number;
    height: number;
}

interface ContentItemProps {
    itemIndex: number;
    pageIndex: number;
    items: { text: string; image: string }[];
    setItems: (
        pageIndex: number,
        items: { text: string; image: string }[]
    ) => void;
    removeItem: (pageIndex: number, index: number) => void;
    pages: { text: string; image: string }[][];
    setPages: (pages: { text: string; image: string }[][]) => void;
}

const ContentItem: React.FC<ContentItemProps> = ({
    itemIndex,
    pageIndex,
    items,
    setItems,
    removeItem,
    pages,
    setPages,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(items[itemIndex].text);
    const [size, setSize] = useState<Size>({ width: 200, height: 100 });

    const [{ isDragging }, dragRef] = useDrag({
        type: "ITEM",
        item: { index: itemIndex, pageIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: "ITEM",
        hover: (draggedItem: { index: number; pageIndex: number }) => {
            if (
                draggedItem.index !== itemIndex ||
                draggedItem.pageIndex !== pageIndex
            ) {
                // Verifique se a página de destino não é a mesma da origem
                if (draggedItem.pageIndex !== pageIndex) {
                    const sourcePageIndex = draggedItem.pageIndex;
                    const targetPageIndex = pageIndex;

                    // Atualize o item na página de origem
                    const sourceItems = [...pages[sourcePageIndex]];
                    const [movedItem] = sourceItems.splice(
                        draggedItem.index,
                        1
                    );

                    // Atualize o item na página de destino
                    const targetItems = [...pages[targetPageIndex]];
                    targetItems.splice(itemIndex, 0, movedItem);

                    // Atualize o estado para ambas as páginas
                    const updatedPages = [...pages];
                    updatedPages[sourcePageIndex] = sourceItems;
                    updatedPages[targetPageIndex] = targetItems;
                    setPages(updatedPages);

                    // Atualize o item arrastado com as novas posições
                    draggedItem.index = itemIndex;
                    draggedItem.pageIndex = targetPageIndex;
                }
            }
        },
    });

    const combinedRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (node) {
                dragRef(dropRef(node));
            }
        },
        [dragRef, dropRef]
    );

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        const updatedItems = [...items];
        updatedItems[itemIndex].text = e.target.value;
        setItems(pageIndex, updatedItems);
    };

    const handleResizeStop: RndResizeCallback = (
        _e,
        _dir,
        ref,
        _delta,
        _position
    ) => {
        const newWidth = ref.offsetWidth;
        const newHeight = ref.offsetHeight;
        setSize({
            width: newWidth,
            height: newHeight,
        });
    };

    return (
        <div
            ref={combinedRef}
            style={{
                position: "relative",
                width: size.width,
                height: size.height,
            }}
        >
            <Rnd
                size={size}
                onResizeStop={handleResizeStop}
                minWidth={100}
                minHeight={50}
                bounds="parent"
                className={`content-item ${isDragging ? "dragging" : ""}`}
            >
                <div className="content-item-inner">
                    <img
                        src={fixedImage}
                        alt="Item"
                        className="content-item-image"
                    />
                    {isEditing ? (
                        <input
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                            onBlur={() => setIsEditing(false)}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setIsEditing(true)}>{text}</span>
                    )}
                </div>
                <button
                    onClick={() => removeItem(pageIndex, itemIndex)}
                    className="delete-item-button"
                >
                    🗑
                </button>
            </Rnd>
        </div>
    );
};

export default ContentItem;
