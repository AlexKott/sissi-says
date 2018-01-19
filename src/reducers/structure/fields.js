import * as t from '@/actions/types';

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
    label: 'Position (vertikal)',
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
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.type === 'structure') {
    return payload.data.fields;
  }

  return state;
}

export function getFieldByName(state, fieldName) {
  const field = state.structure.fields[fieldName];
  return { [fieldName]: field };
}
