export function renderSummaryCard(container, statusInfo) {
  const card = document.createElement('div');
  card.classList.add('summary-card');

  const boothStatus = statusInfo.pollingBooth ? statusInfo.pollingBooth : 'Known';

  card.innerHTML = `
    <h3>🎉 Election Readiness Summary</h3>
    <ul>
      <li><strong>Registration:</strong> ✅ Complete</li>
      <li><strong>Voter ID:</strong> ✅ Ready</li>
      <li><strong>Polling Booth:</strong> 📍 ${boothStatus}</li>
    </ul>
    <div class="final-score">
      <span>Final Score:</span>
      <strong aria-label="100 percent readiness">100%</strong>
    </div>
  `;

  container.appendChild(card);
  container.scrollTop = container.scrollHeight;
}
