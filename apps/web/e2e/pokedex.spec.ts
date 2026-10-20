import { test, expect } from "@playwright/test";

test.describe("Jornada do Usuário na Pokédex", () => {
  test("deve exibir a listagem inicial e abrir o modal de detalhes do Pokémon", async ({ page }) => {
    await page.goto("/");

    // 1. Verifica header
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("heading", { name: /pokédex avançada/i })).toBeVisible();

    // 2. Aguarda e valida a exibição dos cards de pokémon
    const firstCard = page.getByRole("button", { name: /ver detalhes de bulbasaur/i });
    await expect(firstCard).toBeVisible({ timeout: 15000 });

    // 3. Clica no card para abrir o modal de detalhes
    await firstCard.click();

    // 4. Valida a exibição do modal e informações detalhadas
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    await expect(page.getByRole("heading", { name: /bulbasaur/i })).toBeVisible();

    // 5. Valida estatísticas e evolução
    await expect(page.getByText(/estatísticas base/i)).toBeVisible();

    // 6. Fecha o modal
    const closeBtn = page.getByRole("button", { name: /fechar detalhes/i });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test("deve navegar entre as páginas de pokémon", async ({ page }) => {
    await page.goto("/");

    // Aguarda carregar primeira página
    await expect(page.getByRole("button", { name: /ver detalhes de bulbasaur/i })).toBeVisible({
      timeout: 15000
    });

    // Clica no botão 'Próxima'
    const nextBtn = page.getByRole("button", { name: /próxima página/i });
    await expect(nextBtn).toBeEnabled();
    await nextBtn.click();

    // Valida indicação de página 2
    await expect(page.getByText(/página 2 de/i)).toBeVisible();
  });
});

