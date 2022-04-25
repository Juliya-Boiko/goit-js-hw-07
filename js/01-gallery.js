import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = creatingGalleryMarkup(galleryItems);
function creatingGalleryMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href='${original}'>
                <img
                    class="gallery__image"
                    src='${preview}'
                    data-source='${original}'
                    alt='${description}'
                />
            </a>
        </div>
        `;
    }).join('');
}
galleryContainer.insertAdjacentHTML('afterbegin', cardsMarkup);
galleryContainer.addEventListener('click', openModal);

function openModal(evt) {
    const isClickOnImage = evt.target.classList.contains('gallery__image');
    if (!isClickOnImage) {
        return;
    }
    evt.preventDefault();

    const urlOriginal = evt.target.dataset.source;
    const instance = basicLightbox.create(`
        <img width="1400" height="900" src="${urlOriginal}">
    `);

    instance.show();

    if (instance.visible()) {
        window.addEventListener('keydown', onEscapePress);
    }

    function onEscapePress(event) {
        if (event.key === 'Escape') {
            instance.close();
        }
    }
}


