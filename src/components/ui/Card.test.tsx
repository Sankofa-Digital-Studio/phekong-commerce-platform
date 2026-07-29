import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("uses a level-two heading by default", () => {
    render(<Card title="Supporting content">Body</Card>);

    expect(screen.getByRole("heading", { level: 2, name: "Supporting content" })).toBeInTheDocument();
  });

  it("supports a page-level heading when it owns the route title", () => {
    render(
      <Card title="Products" headingLevel={1}>
        Body
      </Card>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Products" })).toBeInTheDocument();
  });
});