import { render,screen } from "@testing-library/react";
import { describe,expect,it } from "vitest";
import { SiteFooter } from "./SiteFooter";
describe("SiteFooter",()=>{it("exposes navigation and an honest checkout status",()=>{render(<SiteFooter/>);expect(screen.getByRole("contentinfo")).toBeInTheDocument();expect(screen.getByRole("link",{name:/explore the collection/i})).toHaveAttribute("href","/products");expect(screen.getByRole("link",{name:/saved items/i})).toHaveAttribute("href","/wishlist");expect(screen.getByText(/secure checkout coming soon/i)).toBeInTheDocument()})});
