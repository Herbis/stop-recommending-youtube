const observeUrlChange = () => {
    let initialShortsScrollPrevented = false;
    let oldHref = document.location.href;
    let keyNavigationBlockActive = false;
    const body = document.querySelector("body");

    const observer = new MutationObserver(mutations => {
        let currentUrl = document.location.href;
        if (!initialShortsScrollPrevented && currentUrl.includes('shorts')) {
            // prevent scrolling on shorts when page is loaded first
            initialShortsScrollPrevented = preventShortsScroll();
            preventKeyNavigation();
            removeEventListener()
            keyNavigationBlockActive = true;
        } else if (oldHref !== currentUrl) {
            if (currentUrl.includes('shorts')) {
                // prevent scrolling on shorts when navigating to a new page
                preventShortsScroll();
                preventKeyNavigation();
                keyNavigationBlockActive = true;
            } else {
                // clear key navigation block when navigating to a new page
                if (keyNavigationBlockActive) {
                    clearKeyNavigation();
                    keyNavigationBlockActive = false;
                }
            }
        }
        oldHref = currentUrl;
    });
    observer.observe(body, { childList: true, subtree: true });
  };
  
window.onload = observeUrlChange;

function preventShortsScroll() {
    var ytdShortsElement = document.getElementsByTagName('ytd-shorts');

    if (ytdShortsElement.length > 0) {
        ytdShortsElement[0].addEventListener('wheel', preventScroll, {passive: false});
        return true;
    } 

    return false;
}

// prevent navigation with arrow keys
function preventKeyNavigation() {
    document.addEventListener('keydown', ignoreArrowUpAndDown, true); // true to catch the event in the capture phase
}

function ignoreArrowUpAndDown(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
        console.warn('Prevented navigation with arrow keys');
        return false; // return false to prevent default behavior and stop propagation
    }
    return true;
}


function clearKeyNavigation() {
    console.warn('Clearing key navigation');
    document.removeEventListener('keydown', ignoreArrowUpAndDown, true); 
}

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}
