import { combineReducers } from 'redux';

// Mock data: makes test fail
const initialStateTypes = [
    {
        key: 'standard',
        label: 'Standard',
        elements: ['title', 'content', 'horizontalPosition', 'verticalPosition', 'width'],
        isProtected: false,
    },
    {
        key: 'contactForm',
        label: 'Kontaktformular',
        elements: ['title'],
        isProtected: true,
    }
];

function types(state = initialStateSections, action = {}) {
    return state;
}

// Mock data: makes test fail
const initialStateElements = [
    {
      key: 'title',
      label: 'Titel',
      type: 'string',
    },
    {
      key: 'content',
      label: 'Inhalte',
      type: 'markdown'
    },
    {
      key: 'horizontalPosition',
      label: 'Position (horizontal)',
      type: 'choice',
      choices: [
        { key: 'left', label: 'Links' },
        { key: 'right', label: 'Rechts' }
      ]
    },
    {
      key: 'verticalPosition',
      label: 'Scrollposition (vertikal)',
      type: 'choice',
      choices: [
        { key: 'standard', label: 'Standard' },
        { key: 'high', label: 'Hoch' },
        { key: 'centered', label: 'Auf Seite zentriert' }
      ]
    },
    {
      key: 'width',
      label: 'Breite',
      type: 'choice',
      choices: [
        { key: 'standard', label: 'Standard' },
        { key: 'wide', label: 'Breit' }
      ]
    }
];

function elements(state = initialStateElements, action = {}) {
    return state;
}

export default combineReducers({
    types,
    elements,
});
