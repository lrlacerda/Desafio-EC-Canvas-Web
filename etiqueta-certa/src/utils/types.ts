export interface Page {
    id: string;
    items: ContentItem[];
}

export interface ContentItem {
    id: string;
    text: string;
}

export interface Canvas {
    pages: Page[];
}
