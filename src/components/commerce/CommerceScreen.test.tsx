import { fireEvent,render,screen } from "@testing-library/react";
import { describe,expect,it } from "vitest";
import { CommerceScreen } from "./CommerceScreen";
describe("CommerceScreen",()=>{
  it("updates cart quantities and totals",()=>{render(<CommerceScreen kind="cart"/>);fireEvent.click(screen.getByRole("button",{name:/increase nourishing shea butter/i}));expect(screen.getAllByText("R 920.00")).toHaveLength(2);expect(screen.getByText(/quantity updated to 2/i)).toBeInTheDocument()});
  it("removes wishlist items and exposes an empty recovery state",()=>{render(<CommerceScreen kind="wishlist"/>);screen.getAllByRole("button",{name:"Remove"}).forEach(button=>fireEvent.click(button));expect(screen.getByRole("heading",{name:/wishlist is ready/i})).toBeInTheDocument();expect(screen.getByRole("link",{name:/browse products/i})).toHaveAttribute("href","/products")});
  it("keeps account creation honest and optional",()=>{render(<CommerceScreen kind="account"/>);expect(screen.getByText(/browsing and checkout will not require/i)).toBeInTheDocument();fireEvent.click(screen.getByRole("button",{name:/create an account/i}));expect(screen.getByText(/coming with secure sign-in/i)).toBeInTheDocument()});
});
