// Mock data: makes test fail
const initialState = {
    metaTitle: {
        label: 'Name der Website',
        type: 'string',
    },
    metaDescription: {
        label: 'Kurze Beschreibung der Website',
        type: 'text',
    },
    title: {
        label: 'Titel',
        type: 'string',
    },
    backgroundImage: {
        label: 'Hintergrundbild',
        type: 'image',
    },
    slug: {
        label: 'Route',
        placeholder: '/coaching',
        type: 'string',
    },
    content: {
        label: 'Inhalte',
        type: 'markdown',
    },
    horizontalPosition: {
        label: 'Position (horizontal)',
        type: 'choice',
        choices: [
            { key: 'left', label: 'Links' },
            { key: 'right', label: 'Rechts' },
        ],
    },
    verticalPosition: {
        type: 'choice',
        choices: [
            { key: 'standard', label: 'Standard' },
            { key: 'high', label: 'Hoch' },
            { key: 'centered', label: 'Auf Seite zentriert' },
        ],
    },
    width: {
        label: 'Breite',
        type: 'choice',
        choices: [
            { key: 'standard', label: 'Standard' },
            { key: 'wide', label: 'Breit' },
        ],
    },
};

export default (state = initialState, action = {}) => {
    return state;
}
