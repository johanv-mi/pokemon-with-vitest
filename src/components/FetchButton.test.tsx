import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FetchButton from "./FetchButton";

describe("FetchButton", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("displays default text when not loading", () => {
    render(<FetchButton onClick={mockOnClick} loading={false} />);

    expect(screen.getByText("WHO'S THAT POKÈMON?")).toBeInTheDocument();
  });

  it("displays loading text when loading is true", () => {
    render(<FetchButton onClick={mockOnClick} loading={true} />);

    expect(screen.getByText("CATCHING...")).toBeInTheDocument();
  });

  it("should not call onClick when clicked and loading", () => {
    render(<FetchButton onClick={mockOnClick} loading={true} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
