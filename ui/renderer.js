import { renderTopPanel, renderReserveTray, renderSelectedUnit, renderActionButtons, renderTacticalCards, renderCombatQueue, renderLog, renderPhaseChecklist } from "./panels.js";
import { renderBoard } from "./board.js";

export function renderAll(state, uiState, handlers) {
  const actionButtons = typeof handlers.buildActionButtons === "function" ? handlers.buildActionButtons() : [];
  const cardButtons = typeof handlers.buildCardButtons === "function" ? handlers.buildCardButtons() : [];
  renderTopPanel(state);
  renderReserveTray(state, uiState, handlers.onUnitSelect);
  renderSelectedUnit(state, uiState);
  renderActionButtons(actionButtons);
  renderTacticalCards(state, cardButtons);
  renderCombatQueue(state);
  renderLog(state);
  renderBoard(state, uiState, handlers);
  renderPhaseChecklist(state, typeof handlers.getPhaseChecklist === "function" ? handlers.getPhaseChecklist() : null);

  const modeBanner = document.getElementById("modeBanner");
  modeBanner.textContent = handlers.getModeText();
  // Style the mode banner based on current state
  modeBanner.className = "mode-banner";
  if (uiState.pendingPass) modeBanner.classList.add("mode-warning");
  else if (uiState.mode) modeBanner.classList.add("mode-active");
  else if (uiState.locked) modeBanner.classList.add("mode-locked");

  const passBtn = document.getElementById("passBtn");
  const canPass = state.activePlayer === "playerA" && ["movement", "assault", "combat"].includes(state.phase) && !state.players.playerA.hasPassedThisPhase;
  passBtn.disabled = !canPass;
  passBtn.textContent = uiState.pendingPass ? "Confirm Pass" : "Pass Phase";
  passBtn.className = uiState.pendingPass ? "btn warn pass-confirm-flash" : "btn primary";
}
