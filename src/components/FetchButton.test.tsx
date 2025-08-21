import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FetchButton from "./FetchButton";

describe("FetchButton", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });
});

it("displays default text when not loading", () => {
  const mockOnClick = vi.fn();
  render(<FetchButton onClick={mockOnClick} loading={false} />);

  expect(screen.getByText("WHO'S THAT POKÈMON?")).toBeInTheDocument();
});

it("displays loading text when loading is true", () => {
  const mockOnClick = vi.fn();
  render(<FetchButton onClick={mockOnClick} loading={true} />);

  expect(screen.getByText("CATCHING...")).toBeInTheDocument();
});
