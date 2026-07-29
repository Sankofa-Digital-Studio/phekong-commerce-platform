import type { Meta,StoryObj } from "@storybook/nextjs-vite";
import { expect,userEvent,within } from "storybook/test";
import { CommerceScreen } from "./CommerceScreen";
const meta={title:"M2/Commerce/CommerceScreen",component:CommerceScreen,parameters:{layout:"fullscreen"},tags:["autodocs"]} satisfies Meta<typeof CommerceScreen>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Cart:Story={args:{kind:"cart"},play:async({canvasElement})=>{const canvas=within(canvasElement);await userEvent.click(canvas.getByRole("button",{name:/increase nourishing shea butter/i}));await expect(canvas.getAllByText("R 920.00")).toHaveLength(2)}};
export const Wishlist:Story={args:{kind:"wishlist"}};
export const Account:Story={args:{kind:"account"}};
