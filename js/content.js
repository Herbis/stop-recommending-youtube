window.onload = function() {
    preventShortsScroll();
}

function preventShortsScroll() {
    var ytdShortsElement = document.getElementsByTagName('ytd-shorts');

    // TODO is not loaded yet. Need to wait for it to load.
    console.warn('ytdShortsElement: ' + ytdShortsElement.length);
    if (ytdShortsElement.length > 0) {
        ytdShortsElement[0].addEventListener('wheel', preventScroll, {passive: false});
    }
}

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}