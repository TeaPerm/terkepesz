import { startGame } from "./startGame.js";
import { play_btn } from "../utility/constants.js";

function showStartScreen() {
  play_btn.addEventListener("click", startGame);
}
showStartScreen()

document.getElementById('GameRules').addEventListener('click', function () {
  window.location.href = 'src/rules.html';
});
// startGame()
