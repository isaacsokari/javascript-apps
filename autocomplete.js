const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
  inputPlaceholder,
}) => {
  root.innerHTML = `
  <label><b>Search</b></label>
  <input type="text" placeholder="${inputPlaceholder}"/>
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results">
        <a class="dropdown-item"></a>
      </div>
  </div>
  <div class="summary"></div>
`;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = debounce(async (event) => {
    if (event.target.value.trim()) {
      const items = await fetchData(event.target.value.trim());

      if (!items.length) {
        dropdown.classList.remove('is-active');
        return;
      }

      resultsWrapper.innerHTML = '';
      dropdown.classList.add('is-active');

      for (let item of items) {
        const option = document.createElement('a');

        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);

        option.addEventListener('click', () => {
          dropdown.classList.remove('is-active');
          input.value = inputValue(item);
          onOptionSelect(item);
        });

        resultsWrapper.appendChild(option);
      }
    } else {
      dropdown.classList.remove('is-active');
    }
  });

  input.addEventListener('input', onInput);

  document.addEventListener('click', (event) => {
    if (!resultsWrapper.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
