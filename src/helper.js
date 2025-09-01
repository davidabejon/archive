export function capitalize(str) {
    if (typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function checkLinks(text) {
    if (typeof text !== 'string') return text
    return text.replace(/https:\/\/anilist\.co\//g, '/')
}