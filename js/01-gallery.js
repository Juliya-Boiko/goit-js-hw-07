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

    if (urlOriginal) {
        const instance = basicLightbox.create(`
            <img width="1400" height="900" src="${urlOriginal}">
        `, {
            onShow: () => window.addEventListener("keydown", onEscapePress),
            onClose: () => window.removeEventListener("keydown", onEscapePress)
        });

        instance.show();

        function onEscapePress(event) {
            if (event.key === 'Escape') {
                instance.close();
            }
        }
    }

}


