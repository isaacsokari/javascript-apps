const form = document.querySelector('form');
const messageContainer = document.querySelector('#message-container');
const messageForm = document.querySelector('#message-form');
const linkContainer = document.querySelector('#link-container');

const { hash } = window.location;
const message = atob(hash.substr(1));

if (message) {
  messageContainer.querySelector('h1').innerText = message;
  messageContainer.classList.remove('hide');
  messageForm.classList.add('hide');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  messageForm.classList.add('hide');
  linkContainer.classList.remove('hide');

  const messageInput = document.querySelector('#message-input');
  const encrypted = btoa(messageInput.value.trim());

  const link = document.querySelector('#link-input');

  link.value = `${window.location}#${encrypted}`;
  link.select();

  const copyButton = linkContainer.querySelector('button');

  copyButton.addEventListener('click', () => {
    link.select();
    document.execCommand('copy');
    M.toast({ html: 'Link Copied to Clipboard' });
  });
});
