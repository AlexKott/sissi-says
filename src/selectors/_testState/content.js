export default {
  global: {
    image: 'abcde.png',
    pages: ['abc123', 'def345'],
    title: 'Test Project Title',
  },
  pages: {
    'abc123': {
      id: 'abc123',
      path: '',
      sections: ['345def'],
      title: 'Welcome',
      type: 'standard',
    },
    'def345': {
      id: 'def345',
      path: 'photos',
      sections: ['123abc'],
      title: 'My Album',
      type: 'gallery',
    },
  },
  sections: {
    '123abc': {
      id: '123abc',
      image: 'bfbfbfb.png',
      type: 'photo',
    },
    '345def': {
      id: '345def',
      title: 'This is awesome',
      type: 'standard',
    },
  },
};
