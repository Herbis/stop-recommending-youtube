const observeUrlChange = () => {
    let initialShortsScrollPrevented = false;
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(mutations => {
        if (!initialShortsScrollPrevented && oldHref.includes('shorts')) {
            initialShortsScrollPrevented = preventShortsScroll();
        } else if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            preventShortsScroll();
        }
    });
    observer.observe(body, { childList: true, subtree: true });
  };

  
window.onload = observeUrlChange;

function preventShortsScroll() {
    console.warn('preventShortsScroll');
    var ytdShortsElement = document.getElementsByTagName('ytd-shorts');

    if (ytdShortsElement.length > 0) {
        ytdShortsElement[0].addEventListener('wheel', preventScroll, {passive: false});
        return true;
    }

    return false;
}

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}
