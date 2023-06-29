import axios from "axios";

const getBooks = async (URL, title, category, startIndex, MAX_RESULT, orderBy, API_KEY) => {
    const titleForSearch = title.split(" ").join("+");

    const data = await axios.get(
        `${URL}?q=intitle:${titleForSearch}+subject:${category}&startIndex=${startIndex}&maxResults=${MAX_RESULT}&orderBy=${orderBy}&key=${API_KEY}`
    );

    const listBooks = data.data.items;
    let newBooks = [];

    if (listBooks?.length > 0) {
        newBooks = listBooks.map(({ volumeInfo, id }) => ({
            title: volumeInfo.title,
            description: volumeInfo.description || "",
            authors: volumeInfo.authors || [],
            categories: volumeInfo.categories || [],
            logo: volumeInfo.imageLinks?.thumbnail || "",
            id,
        }))
    }

    return { data: newBooks, count: data.data.totalItems };
};

export default getBooks;