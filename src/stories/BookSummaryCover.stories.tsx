import type { Meta, StoryObj } from "@storybook/react"
import BookSummaryCover from "../components/BookSummaryCover"

const meta: Meta<typeof BookSummaryCover> = {
    component: BookSummaryCover,
}

export default meta

type Story = StoryObj<typeof BookSummaryCover>

export const Default: Story = {
    args: {
        book_cover: "https://covers.openlibrary.org/b/olid/OL33944114M.jpg",
        // book_cover_redir: 'https://mubooks.nl/uploads/1730044872.jpg',
    },
}
