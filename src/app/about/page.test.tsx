
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "./page";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("../../components/shell/ApplicationShell", () => ({
  ApplicationShell: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("AboutPage", () => {
  it("renders the main About page heading and all core sections", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /about phekong/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /why choose us/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /our products & services/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /our values/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /begin your wellness journey today/i,
      })
    ).toBeInTheDocument();
  });

  it("renders all About page content cards", () => {
    render(<AboutPage />);

    // Why Choose Us
    expect(
      screen.getByRole("heading", { name: /expertise/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /commitment/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /attention to detail/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /customer service/i })
    ).toBeInTheDocument();

    // Products & Services
    expect(
      screen.getByRole("heading", { name: /herbal products/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /massages/i })
    ).toBeInTheDocument();

    // Values
    expect(
      screen.getByRole("heading", { name: /quality/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /integrity/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /community/i })
    ).toBeInTheDocument();
  });

  it("renders CTA links with the correct destinations", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("link", { name: /shop now/i })
    ).toHaveAttribute("href", "/products");

    expect(
      screen.getByRole("link", { name: /book massage/i })
    ).toHaveAttribute("href", "/services");
  });

  it("renders images with meaningful alternative text", () => {
    render(<AboutPage />);

    expect(
      screen.getByAltText(/Massage therapy and herbal product preparation with natural herbs/i)
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(/selection of phekong herbal wellness products/i)
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(
        /massage services offered at phekong wellness centre/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(/herbal wellness tea with natural leaves/i)
    ).toBeInTheDocument();
  });

  it("renders the breadcrumb Home link", () => {
    render(<AboutPage />);

    const homeLink = screen.getByRole("link", {
      name: /^home$/i,
    });

    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("does not render duplicate HTML ids", () => {
    const { container } = render(<AboutPage />);

    const ids = Array.from(container.querySelectorAll("[id]")).map(
      (element) => element.id
    );

    expect(new Set(ids).size).toBe(ids.length);
  });
});