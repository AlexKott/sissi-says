import _cloneDeep from 'lodash.clonedeep';
import testState from './_testState';

import * as selectors from './navbar';

describe('selectors/navbar', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(testState);
    mockState.location = {
      routesMap: {
        globalRoute: {
          itemType: 'global',
        },
      },
      type: 'globalRoute',
    };
  });

  describe('getPropsForNavBar', () => {
    describe('level 1', () => {
      describe('multiple pages allowed', () => {
        it('should return "pages" as type', () => {
          const result = selectors.getPropsForNavBar(1)(mockState);

          expect(result).toHaveProperty('type', 'pages');
        });

        it('should return "global" as parentId', () => {
          const result = selectors.getPropsForNavBar(1)(mockState);

          expect(result).toHaveProperty('parentId', 'global');
        });

        describe('navItems', () => {
          it('should be an array of pages', () => {
            const result = selectors.getPropsForNavBar(1)(mockState);

            expect(result.navItems[0]).toHaveProperty('_id', 'abc123');
            expect(result.navItems[1]).toHaveProperty('_id', 'def345');
          });

          it('should include a link for each item', () => {
            const result = selectors.getPropsForNavBar(1)(mockState);

            expect(result.navItems[0]).toHaveProperty('_link', '/page/abc123');
            expect(result.navItems[1]).toHaveProperty('_link', '/page/def345');
          });
        });

        describe('canAdd', () => {
          it('should be true if more pages can be added', () => {
            const result = selectors.getPropsForNavBar(1)(mockState);

            expect(result).toHaveProperty('canAdd', true);
          });

          it('should be false if no more pages can be added', () => {
            mockState.structure.global.maxItems = 2;
            const result = selectors.getPropsForNavBar(1)(mockState);

            expect(result).toHaveProperty('canAdd', false);
          });
        });
      });

      describe('single page', () => {
        beforeEach(() => {
          mockState.structure.global.maxItems = 1;
          mockState.content.global._items = ['singlePage'];
          mockState.content.pages = {
            singlePage: {
              _id: 'singlePage',
              _items: ['345def', '123abc'],
              _type: 'standard',
            },
          };
        });

        it('should return "sections" as type', () => {
          const result = selectors.getPropsForNavBar(1)(mockState);

          expect(result).toHaveProperty('type', 'sections');
        });

        it('should return the single page id as parentId', () => {
          const result = selectors.getPropsForNavBar(1)(mockState);

          expect(result).toHaveProperty('parentId', 'singlePage');
        });

        describe('navItems', () => {
          it('should be an array of sections', () => {
            const result = selectors.getPropsForNavBar(1)(mockState);

            expect(result.navItems[0]).toHaveProperty('_id', '345def');
            expect(result.navItems[1]).toHaveProperty('_id', '123abc');
          });

          it('should include a link for each item', () => {
            const result = selectors.getPropsForNavBar(1)(mockState);

            expect(result.navItems[0]).toHaveProperty('_link', '/page/singlePage/section/345def');
            expect(result.navItems[1]).toHaveProperty('_link', '/page/singlePage/section/123abc');
          });
        });

        describe('canAdd', () => {
          it('should be true if more sections can be added', () => {
            const result = selectors.getPropsForNavBar(1)(mockState);

            expect(result).toHaveProperty('canAdd', true);
          });

          it('should be false if no more sections can be added', () => {
            mockState.structure.pages.standard.maxItems = 2;
            const result = selectors.getPropsForNavBar(1)(mockState);

            expect(result).toHaveProperty('canAdd', false);
          });
        });
      });
    });

    describe('level 2', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'abc123',
          },
          routesMap: {
            pagesRoute: {
              itemType: 'pages',
            },
          },
          type: 'pagesRoute',
        };
      });

      describe('multiple sections allowed for current page type', () => {
        it('should return "sections" as type', () => {
          const result = selectors.getPropsForNavBar(2)(mockState);

          expect(result).toHaveProperty('type', 'sections');
        });

        it('should return the id of the selected page as parentId', () => {
          const result = selectors.getPropsForNavBar(2)(mockState);

          expect(result).toHaveProperty('parentId', 'abc123');
        });

        describe('navItems', () => {
          it('should be an array of sections', () => {
            const result = selectors.getPropsForNavBar(2)(mockState);

            expect(result.navItems[0]).toHaveProperty('_id', '345def');
            expect(result.navItems[1]).toHaveProperty('_id', '123abc');
          });

          it('should include a link for each item', () => {
            const result = selectors.getPropsForNavBar(2)(mockState);

            expect(result.navItems[0]).toHaveProperty('_link', '/page/abc123/section/345def');
            expect(result.navItems[1]).toHaveProperty('_link', '/page/abc123/section/123abc');
          });
        });

        describe('canAdd', () => {
          it('should be true if more sections can be added', () => {
            const result = selectors.getPropsForNavBar(2)(mockState);

            expect(result).toHaveProperty('canAdd', true);
          });

          it('should be false if no more sections can be added', () => {
            mockState.structure.pages.standard.maxItems = 2;
            const result = selectors.getPropsForNavBar(2)(mockState);

            expect(result).toHaveProperty('canAdd', false);
          });
        });
      });

      describe('no sections allowed for current page type', () => {
        it('should return null as type', () => {
          mockState.structure.pages.standard.maxItems = 0;
          const result = selectors.getPropsForNavBar(2)(mockState);

          expect(result).toHaveProperty('type', null);
        });
      });

      describe('single page', () => {
        it('should return null as type', () => {
          mockState.structure.global.maxItems = 1;
          mockState.content.global._items = ['singlePage'];
          mockState.content.pages = {
            singlePage: {
              _id: 'singlePage',
              _items: ['345def', '123abc'],
              _type: 'standard',
            },
          };
          mockState.location = {
            routesMap: {
              globalRoute: {
                itemType: 'global',
              },
            },
            type: 'globalRoute',
          };
          const result = selectors.getPropsForNavBar(2)(mockState);

          expect(result).toHaveProperty('type', null);
        });
      });
    });
  });
});
