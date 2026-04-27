export function renderMessage(container, sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('message-content');
  
  // Basic markdown link parsing for better UX
  const formattedText = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  contentDiv.innerHTML = formattedText;

  messageDiv.appendChild(contentDiv);
  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

export function showTypingIndicator(container) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', 'assistant');
  messageDiv.id = 'typingIndicator';

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('typing-indicator');
  
  contentDiv.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;

  messageDiv.appendChild(contentDiv);
  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

export function removeTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  if (indicator) {
    indicator.remove();
  }
}

export function toggleInputState(inputElement, buttonElement, isDisabled) {
  inputElement.disabled = isDisabled;
  buttonElement.disabled = isDisabled;
  if (!isDisabled) {
    inputElement.focus();
  }
}
