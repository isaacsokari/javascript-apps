const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? null : movie.Poster;
    return `
    <img src="${imgSrc}" style="display:${imgSrc ? 'inline' : 'none'}" alt="${
      movie.Title
    }"/>
    ${movie.Title}
    `;
  },
  inputPlaceholder: 'Enter Movie Name',

  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: 'afff5766',
        s: searchTerm,
      },
    });

    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  },
};

createAutoComplete({
  root: document.querySelector('#left-autocomplete'),
  ...autoCompleteConfig,
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
});

createAutoComplete({
  root: document.querySelector('#right-autocomplete'),
  ...autoCompleteConfig,
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});

let leftMovie, rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('https://www.omdbapi.com/', {
    params: {
      apikey: 'afff5766',
      i: movie.imdbID,
    },
  });

  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) runComparison();
};

const runComparison = () => {
  const leftStats = document.querySelectorAll('#left-summary .notification');
  const rightStats = document.querySelectorAll('#right-summary .notification');

  let leftWins = 0;
  let rightWins = 0;

  leftStats.forEach((leftStat, index) => {
    const rightStat = rightStats[index];

    const leftValue = +leftStat.dataset.value;
    const rightValue = +rightStat.dataset.value;

    // console.log(typeof leftValue, typeof rightValue);
    if (rightValue > leftValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
      rightWins++;
    } else if (rightValue < leftValue) {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
      leftWins++;
    }
  });

  if (leftWins > rightWins) {
    const messsage = document.querySelector('#message');
    messsage.className = 'notification is-success is-light';
    messsage.innerHTML = `${leftMovie.Title.toUpperCase()} WINS!!!
      `;
    scrollToTop();
  } else if (leftWins < rightWins) {
    const messsage = document.querySelector('#message');
    messsage.className = 'notification is-success is-light';
    messsage.innerHTML = `${rightMovie.Title.toUpperCase()} WINS!!!
      `;
    scrollToTop();
  } else {
    const messsage = document.querySelector('#message');
    messsage.className = 'notification is-warning is-light';
    messsage.innerHTML = `WE HAVE A DRAW :(`;
    scrollToTop();
  }
};

const movieTemplate = (movieDetail) => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/, ''));

  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" alt="${movieDetail.Title}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article data-value="${awards}" class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article data-value="${dollars}" class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article data-value="${metascore}" class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article data-value="${imdbRating}" class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value="${imdbVotes}" class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

const scrollToTop = () => {
  // document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
