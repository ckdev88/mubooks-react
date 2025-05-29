// TODO 'icon' arg is left empty, find out how GLOBAL should be implemented
import type { Meta, StoryObj } from "@storybook/react"
import Heading from "../../components/ui/Heading"

const meta: Meta<typeof Heading> = {
    component: Heading,
}

export default meta

type Story = StoryObj<typeof Heading>

export const Default: Story = {
    args: {
        el: "h1",
        text: "I am the default heading",
        sub: "and this is the heading subtext",
    },
}
export const BookTitles: Story = {
    args: {
        el: "h2",
        text: "I am the heading used in for book titles",
        sub: "and this is the heading subtext",
    },
}
export const Dashboard: Story = {
    args: {
        el: "adder-header",
        text: "Heading used in dashboard per category",
    },
}
