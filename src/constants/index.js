export const MAX_RESULT = 30;

export const CATEGORY_OPTIONS = [
    { value: "", name: "All" },
    { value: "art", name: "Art" },
    { value: "biography", name: "Biography" },
    { value: "computers", name: "Computers" },
    { value: "history", name: "History" },
    { value: "medical", name: "Medical" },
    { value: "poetry", name: "Poetry" },
];

export const SORTING_OPTIONS = [
    { value: "relevance", name: "Relevance" },
    { value: "newest", name: "Newest" },
];

export const dotEnv = {
    API_KEY: process.env.REACT_APP_API_KEY,
    URL_SITE: process.env.REACT_APP_URL
}