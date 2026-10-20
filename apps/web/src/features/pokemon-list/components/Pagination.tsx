import React from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious
}) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  return (
    <nav
      role="navigation"
      aria-label="Paginação da lista de Pokémon"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        margin: "32px 0"
      }}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        aria-label="Página anterior"
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: hasPrevious ? "#FFFFFF" : "#EEEEEE",
          cursor: hasPrevious ? "pointer" : "not-allowed",
          fontWeight: 600,
          color: hasPrevious ? "#333" : "#999",
          transition: "background-color 0.2s"
        }}
      >
        &larr; Anterior
      </button>

      <span
        aria-current="page"
        style={{ fontWeight: 600, color: "#444", fontSize: "0.95rem" }}
      >
        Página {currentPage} de {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Próxima página"
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: hasNext ? "#FFFFFF" : "#EEEEEE",
          cursor: hasNext ? "pointer" : "not-allowed",
          fontWeight: 600,
          color: hasNext ? "#333" : "#999",
          transition: "background-color 0.2s"
        }}
      >
        Próxima &rarr;
      </button>
    </nav>
  );
};

