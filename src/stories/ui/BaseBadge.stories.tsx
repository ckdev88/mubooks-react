import type { Meta, StoryObj } from '@storybook/react'
import BaseBadge from '../../components/ui/BaseBadge'

const meta: Meta<typeof BaseBadge> = {
	component: BaseBadge,
}

function removeText() {
	return
}

export default meta

type Story = StoryObj<typeof BaseBadge>

export const Default: Story = {
	args: {
		text: 'thriller',
		removeText: removeText,
		field: undefined,
	},
}
export const Show: Story = {
	args: {
		text: 'thriller',
		removeText: undefined,
	},
}
export const Liked: Story = {
	args: {
		text: 'thriller',
		field: 'tropes_liked',
		removeText: removeText
	},
}
export const ShowLiked: Story = {
	args: {
		text: 'thriller',
		field: 'tropes_liked',
	},
}
export const Disliked: Story = {
	args: {
		text: 'thriller',
		field: 'tropes_disliked',
		removeText: removeText
	},
}
export const ShowDisliked: Story = {
	args: {
		text: 'thriller',
		field: 'tropes_disliked',
	},
}
export const Subject: Story = {
	args: {
		text: 'Vampires',
		type: 'subject',
	},
}
