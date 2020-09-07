const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const messageInput = document.querySelector('#message-input');
  const encrypted = btoa(messageInput.value.trim());

  document.querySelector('#link-input').value = encrypted;
});
