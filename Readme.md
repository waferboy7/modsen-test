# Book Search React App with Google Books API.

**Documentation: https://developers.google.com/books/docs/v1/using.**
**To authorize requests to the API, select the method with the provision of an API key (https://developers.google.com/books/docs/v1/using#APIKey).**

**Functional**

- There should be a text field and a search button. The substring entered by the user is used to search for books. The search trigger is either pressing Enter (when the text field has focus) or pressing the search button.
- Filtering by categories. Below the text field is a select with categories: all, art, biography, computers, history, medical, poetry. If "all" is selected (initially selected), all categories are searched.
- Sorting. Next to the category select is a select with sorting options: relevance (selected initially), newest.
- Found books are displayed as cards, each of which consists of an image of the cover of the book, the title of the book, category titles and authors' names. If more than one category comes for a book, only the first one is displayed. All authors are displayed. If any part of the data does not arrive, then just an empty space instead.
- Above the block with cards, the number of books found on request is displayed.
- Pagination is implemented according to the 'load more' principle. Below the block with cards is the 'Load more' button, by clicking on it, more books are loaded to the already loaded books. Pagination step - 30.
- When you click on the card, you go to the detailed page of the book, which displays its data: cover image, title, all categories, all authors, description.

---
