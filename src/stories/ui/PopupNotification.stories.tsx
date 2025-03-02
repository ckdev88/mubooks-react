import type { Meta, StoryObj } from '@storybook/react'

interface PropTypes {
	popupNotification: string
	isOnline?: boolean
}
function PopupNotification({ popupNotification, isOnline }: PropTypes) {
	const Popper = () => {
		return <>{popupNotification}</>
	}
	return (
		<>
			{!isOnline ? (
				<div id="popupNotificationOffline">
					{' '}
					Offline. Some things won&lsquo;t work.
				</div>
			) : (
				popupNotification !== '' && (
					<div
						id="popupNotification"
						className={popupNotification ? 'show' : 'hide'}
					>
						{popupNotification && <Popper />}
					</div>
				)
			)}
		</>
	)
}

const meta: Meta<typeof PopupNotification> = {
	component: PopupNotification,
}

export default meta
type Story = StoryObj<typeof meta>

export const BookAdded: Story = {
	args: {
		popupNotification: 'Book BOOKNAME was added to LIST',
		isOnline: true,
	},
}
export const Offline: Story = {
	args: { isOnline: false },
}
