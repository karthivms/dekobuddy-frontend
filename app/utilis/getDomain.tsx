'use client'

export const getDomainUrl = () => {
    if (typeof window !== 'undefined') {
        const domain = window.location.hostname;
        const protocol = window.location.protocol;
        let url = '';

        if (domain === 'localhost') {
            const port = window.location.port;
            url = `${protocol}//${domain}:${port}`;
        } else if (domain.includes(".com")) {
            url = `${protocol}//${domain}`;
        } else {
            const port = window.location.port;
            url = `${protocol}//${domain}:${port}`;
        }

        return { domain, url };
    }

    return { domain: '', url: '' }; 
};
