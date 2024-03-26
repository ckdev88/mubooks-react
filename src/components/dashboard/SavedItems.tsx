// import { ref } from 'vue'
// import { useMuBooksStore } from '../../stores/MuBooksStore'
// const muBooksStore = useMuBooksStore()

// let hasbooks = false
// let books = []

// if (muBooksStore.getSavedBooks !== false) {
// 	books = ref(muBooksStore.getSavedBooks.slice(0, 4))
// 	if (books.value.length > 0) hasbooks = true
// }

/*
	<main v-if="hasbooks" className="savedbooks deck">
		<div className="deck-container">
			<article
				className="book-cover"
				v-for="(book, index) in books"
				key="index"
				style={"index ? 'z-index:' + (10 - index) : 'z-index:10'"}
			>
				<div>
					<img src={book.image} alt={ book.title } />
				</div>
			</article>
		</div>
	</main>
*/

export default function SavedItems() {
	return (
		<>
			<main v-else onClick="$router.push({ name: 'search' })" className="toadd">
				<aside>
					<button>
						<img src="/img/save-books-icon.png" />
					</button>
				</aside>
				Let's start saving books.
			</main>
		</>
	)
}
