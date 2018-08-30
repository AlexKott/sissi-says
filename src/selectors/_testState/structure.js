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
    maxPages: 5,
    minPages: 1,
    fields: ['title', 'image'],
  },
  pages: {
    standard: {
      maxSections: 6,
      minSections: 2,
      fields: ['title', 'path'],
    },
    gallery: {
      maxSections: 10,
      minSections: 4,
      fields: ['title', 'path'],
      requiredSections: ['photo'],
      isProtected: true,
    },
  },
  sections: {
    standard: {
      fields: ['title'],
    },
    photo: {
      fields: ['image'],
    },
  },
};
