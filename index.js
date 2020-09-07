const form = document.querySelector('form');
const messageContainer = document.querySelector('#message-container');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const linkContainer = document.querySelector('#link-container');

const { hash } = window.location;
const message = atob(hash.substr(1));

if (message) {
  messageContainer.querySelector('p').innerText = message;
  messageContainer.classList.remove('hide');
  messageForm.classList.add('hide');
}

// debounce function
const debounce = (func, delay = 1000) => {
  let timeoutId;

  return (...args) => {
    console.log(timeoutId);
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (messageInput.value.trim() === '') {
    messageInput.value = '';
    M.toast({
      html: 'Enter Message',
      displayLength: 1000,
      classes: 'toast-danger',
    });
  } else {
    messageForm.classList.add('hide');
    linkContainer.classList.remove('hide');

    const encrypted = btoa(messageInput.value.trim());

    const link = document.querySelector('#link-input');

    link.value = `${window.location}#${encrypted}`;
    link.select();

    const copyButton = linkContainer.querySelector('#copyLink');
    const newMessageBtn = linkContainer.querySelector('#newMessage');

    copyButton.addEventListener(
      'click',
      debounce(() => {
        link.select();
        document.execCommand('copy');
        M.toast({
          html: 'Link Copied to Clipboard',
          displayLength: 1000,
          classes: 'toast-success',
        });
      }, 500)
    );

    newMessageBtn.addEventListener('click', () => {
      linkContainer.classList.add('hide');
      messageInput.value = '';
      messageForm.classList.remove('hide');
    });
  }
});
