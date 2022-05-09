import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

function creatingGallery(items) {
    return items.map(({ preview, original, description }) => {
        return `
            <a class="gallery__item" href="${original}">
                <img 
                    class="gallery__image"
                    src="${preview}" 
                    alt="${description}" />
            </a>
        `;
    }).join('');
}

const galleryMarkup = creatingGallery(galleryItems);
galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);

let lightbox = new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom'
});