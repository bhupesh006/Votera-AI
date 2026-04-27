/**
 * UI Component for Progress Bar
 */

export function updateProgressBar(elementId, percentage) {
  const progressBar = document.getElementById(elementId);
  const scoreText = document.getElementById('scoreText');
  
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
  if (scoreText) {
    scoreText.textContent = `${percentage}% Ready`;
  }
}
