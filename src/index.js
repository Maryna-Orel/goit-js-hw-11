import './scss/style.scss';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix';
/////////////////////////////
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30766499-a42eaf0ff8af607e43fbcb3ed';
export default class fetchApi {
  constructor() {
    this.searchQuery = '';
    this.perPage = 40;
    this.page = 1;
  }
  async makesRequest() {
    const params = new URLSearchParams({
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      });
      const url = `${BASE_URL}/?${params}`;
      this.incrementPage();
      return await axios.get(url);
    }
    
   
      resetPage() {
        this.page = 1; //скидання сторінки
    }

    incrementPage() {
      this.page += 1; //добавлення сторінки з бек при скролі
    }
    get query() {
        return this.searchQuery;
      }
      //Контроль  запроса
      set query(newQuery) {
        this.searchQuery = newQuery;
    }
  }

  ////////////////////////////////
const fetch = new fetchApi();
let cardsGallery = document.querySelector('.gallery ');
const onSearchForm = document.querySelector('#search-form');
onSearchForm.addEventListener('submit', onSearch);


////////////////////
class LoadMoreButton {
    constructor({ selector, hidden = false }) {
      this.refs = this.getRefs(selector);
      hidden && this.hide();
    }
  
    getRefs(selector) {
      const refs = {};
      refs.button = document.querySelector(selector);
      refs.label = refs.button.querySelector('.label');
      refs.spinner = refs.button.querySelector('.spinner');
  
      return refs;
    }
  
    enable() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = '';
        this.refs.spinner.classList.add('is-hidden');
      }
    
      disable() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = 'Loading...';
        this.refs.spinner.classList.remove('is-hidden');
      }
    
      show() {
        this.refs.button.classList.remove('is-hidden');
      }
    
      hide() {
        this.refs.button.classList.add('is-hidden');
      }
    }
    
   ////////////////////////////////     

clearList();
async function onSearch(e) {
    e.preventDefault();
  
    if (!button.classList.contains('is-hidden')) {
      button.classList.add('is-hidden');
    }
  
    fetch.searchQuery = e.currentTarget.elements.searchQuery.value;
    fetch.resetPage();
    // clearList();
  
    try {
      if (fetch.searchQuery === '') {
        clearList();
        Notify.failure('Please enter your search data.');
      } else {
        const response = await fetch.makesRequest();
        const {
          data: { hits, total, totalHits },
        } = response;
  
        if (hits.length === 0) {
          button.classList.add('is-hidden');
  
          setTimeout(
            Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            ),
            0
          );
        } else {
          // ButtonLoad.disable();
          clearList();
          ButtonLoad.disable();
  
          Notify.success('Hooray! We found ${totalHits} images.');
          renderGallery(hits);
          ButtonLoad.enable();
  
          ButtonLoad.show();
          button.classList.remove('is-hidden');
      simpleLightbox();
  
        }
      
      }
      // ButtonLoad.show();
    } catch (error) {
          ButtonLoad.enable();
   Notify.failure("We're sorry, but you've reached the end of search results.");
          button.classList.add('is-hidden');
  
    }
  }
  
  const button = document.querySelector('[data-action="load-more"]');
  const ButtonLoad = new LoadMoreButton({
    selector: '[data-action="load-more"]',
    hidden: true,
  });
  button.addEventListener('click', onLoadMore);
function clearList() {
  cardsGallery.innerHTML = '';
}
function simpleLightbox() {
  // e.preventDefault()
  let lightbox = new SimpleLightbox('.gallery a', {
    captions: false,
    captionDelay: 250,
    enableKeyboard: true,
    doubleTapZoom: 5,
  });
  // console.log(lightbox);
  lightbox.refresh();
}
function scroll() {
  const { height: cardHeight } = document .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();
window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
}
async function infiniteScroll(e) {
// e.preventDefault();
// fetch.resetPage();
// clearList();
try {
  // clearList();
  ellipse.classList.remove('is-hidden');
  const response = await fetch.makesRequest();
  const {
    data: { hits, total, totalHits },
  } = response;
  renderGallery(hits);
  simpleLightbox();
} catch (error) {
  window.removeEventListener('scroll', createCards);
  setTimeout(
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    ),
    10
  );
  // console.log(error.message);
  ellipse.classList.add('is-hidden');
}
}  
///////////////////////////////////
function renderGallery(hits) {
  fetch.page +=1
    const markup = hits.map(hit => {
        return `<li class="photo-card">
          <a class="gallery__link" href="${hit.largeImageURL}">
            <img
              class="gallery__image"
              src="${hit.webformatURL}"
              alt="${hit.tags}"
              loading="lazy"
          /></a>
          <div class="info">
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">likes</b>
              </p>
              <p class="info-counter">${hit.likes.toLocaleString()}</p>
            </div>
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">views</b>
              </p>
              <p class="info-counter">${hit.views.toLocaleString()}</p>
            </div>
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">comments</b>
              </p>
              <p class="info-counter">${hit.comments.toLocaleString()}</p>
            </div>
            <div class="info__box">
              <p class="info-item">
                <b class="material-symbols-outlined">download</b>
              </p>
              <p class="info-counter">${hit.downloads.toLocaleString()}</p>
            </div>
          </div>
        </li>`;
      })
      .join('');
    cardsGallery.insertAdjacentHTML('beforeend', markup);
  }
  async function onLoadMore() {

    const response = await fetch.makesRequest();
    const {
      data: { hits },
    } = response;
    
      if (hits.length === 0) {
            button.classList.add('is-hidden');
      
    Notify.failure("We're sorry, but you've reached the end of search results.");
      } else
        simpleLightbox()
      fetch.incrementPage
      renderGallery(hits);
    };

   
    
    