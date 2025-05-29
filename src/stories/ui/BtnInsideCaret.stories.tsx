import type { Meta, StoryObj } from "@storybook/react"
import BtnInsideCaret from "../../components/ui/BtnInsideCaret"

const meta: Meta<typeof BtnInsideCaret> = {
    component: BtnInsideCaret,
}

export default meta

type Story = StoryObj<typeof BtnInsideCaret>

export const Default: Story = {
    args: {},
}
