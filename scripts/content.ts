const getChannelId = (): string | null => {
    const meta = document.querySelector('meta[itemprop="channelId"]');
    return meta ? meta.getAttribute('content') : null;
};

const createIdElement = (channelId: string, container: HTMLElement): HTMLElement => {
    const span = document.createElement('span');
    span.style.fontSize = '0.7em';
    span.style.color = '#909090';
    span.style.cursor = 'pointer';

    span.addEventListener('mouseenter', () => {
        span.style.color = '#606060';
        span.style.textDecoration = 'underline';
    });
    span.addEventListener('mouseleave', () => {
        span.style.color = '#909090';
        span.style.textDecoration = 'none';
    });
    span.addEventListener('click', () => {
        navigator.clipboard.writeText(channelId);
    });

    span.textContent = ` (${channelId})`;

    return span;
};

const appendChannelId = (container: HTMLElement): void => {
    const channelId = getChannelId();
    if (channelId && !container.querySelector('span')) {
        const span = createIdElement(channelId, container);
        container.appendChild(span);
    }
};

window.addEventListener('load', () => {
    console.log('Hello from inject.ts!');

    const container = document.querySelector('yt-formatted-string#text')?.parentElement;
    if (container) {
        appendChannelId(container);
    }

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target === container) {
                appendChannelId(container);
                break;
            }
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
});
