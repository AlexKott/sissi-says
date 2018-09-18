export default {
  fields: {
    title: {
      label: 'Title',
      placeholder: 'Your title',
      type: 'string',
    },
    path: {
      label: 'Path',
      placeholder: 'about-me',
      type: 'string',
    },
    image: {
      label: 'Image',
      type: 'image',
    },
  },
  global: {
    maxItems: 5,
    minItems: 1,
    fields: ['title', 'image'],
  },
  pages: {
    standard: {
      maxItems: 6,
      minItems: 1,
      label: 'Standard page',
      fields: ['title', 'path'],
    },
    gallery: {
      maxItems: 10,
      minItems: 4,
      label: 'Gallery page',
      fields: ['title', 'path'],
      requiredSections: ['photo'],
      isProtected: true,
    },
  },
  sections: {
    standard: {
      label: 'Standard section',
      fields: ['title'],
    },
    photo: {
      label: 'Photo section',
      fields: ['image'],
      isProtected: true,
    },
  },
};
