import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteFooter } from "./SiteFooter";
const meta={title:"M2/Shell/SiteFooter",component:SiteFooter,parameters:{layout:"fullscreen"},tags:["autodocs"]} satisfies Meta<typeof SiteFooter>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Default:Story={};
export const LocalizedLabel:Story={args:{wellnessCentreLabel:"Senthara sa Bophelo"}};
