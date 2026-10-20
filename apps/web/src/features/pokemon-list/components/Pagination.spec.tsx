import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renderiza controles de navegação acessíveis e reage aos cliques", () => {
    const handleNext = vi.fn();
    const handlePrev = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalItems={60}
        pageSize={20}
        hasNext={true}
        hasPrevious={true}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    );

    const prevButton = screen.getByRole("button", { name: /página anterior/i });
    const nextButton = screen.getByRole("button", { name: /próxima página/i });

    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeEnabled();

    fireEvent.click(prevButton);
    expect(handlePrev).toHaveBeenCalledTimes(1);

    fireEvent.click(nextButton);
    expect(handleNext).toHaveBeenCalledTimes(1);
  });

  it("desabilita os botões de acordo com o estado das páginas", () => {
    render(
      <Pagination
        currentPage={1}
        totalItems={20}
        pageSize={20}
        hasNext={false}
        hasPrevious={false}
        onNext={vi.fn()}
        onPrevious={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /página anterior/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /próxima página/i })).toBeDisabled();
  });
});
