import middleware from './gatherRequestData';
import * as t from '@/actions/types';

describe('middleware/gatherRequestData', () => {
  let mockAction, mockCollector, mockDispatch, mockGetState, mockNext, mockSelectors, mockStore;

  beforeEach(() => {
    mockAction = {
      type: t.SEND_REQUEST,
      payload: {
        method: 'post',
        formName: 'test',
      }};
    mockCollector = jest.fn(() => () => ({}));
    mockDispatch = jest.fn();
    mockGetState = jest.fn();
    mockNext = jest.fn();
    mockSelectors = {
      getMetaData: jest.fn(),
      getAllPages: jest.fn(),
      getAllSections: jest.fn(),
    };
    mockStore = {
      dispatch: mockDispatch,
      getState: mockGetState,
    };
  });

  it('should forward the action if the type is not SEND_REQUEST', () => {
    mockAction = { type: 'test' };

    middleware(mockStore, mockSelectors, mockCollector)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action if the method is not "post"', () => {
    mockAction = { type: t.SEND_REQUEST, payload: { method: 'test' }};

    middleware(mockStore, mockSelectors, mockCollector)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should collect data from the relevant reducers and form', () => {
    middleware(mockStore, mockSelectors, mockCollector)(mockNext)(mockAction);

    expect(mockSelectors.getMetaData).toBeCalled();
    expect(mockSelectors.getAllPages).toBeCalled();
    expect(mockSelectors.getAllSections).toBeCalled();
    expect(mockCollector).toBeCalledWith('test');
  });

  it('should add requestData before forwarding the action', () => {
    middleware(mockStore, mockSelectors, mockCollector)(mockNext)(mockAction);

    expect(mockAction).toHaveProperty('payload');
    expect(mockAction.payload).toHaveProperty('requestData');
    expect(mockAction.payload.requestData).toHaveProperty('meta');
    expect(mockAction.payload.requestData).toHaveProperty('pages');
    expect(mockAction.payload.requestData).toHaveProperty('sections');
    expect(mockNext).toBeCalled();
  });

  describe('save meta form', () => {
    it('should merge the reducer data with the form data', () => {
      mockAction = {
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          formName: 'meta',
        }};
      mockCollector = jest.fn(() => () => ({ metaInfo: 'test' }));
      mockSelectors.getMetaData = jest.fn(() => ({ metaInfo: '', metaName: 'blubb' }));
      const expectedMetaData = { metaInfo: 'test', metaName: 'blubb' };

      middleware(mockStore, mockSelectors, mockCollector)(mockNext)(mockAction);

      expect(mockAction.payload.requestData).toHaveProperty('meta', expectedMetaData);
    });
  });

  describe('save pages form', () => {
    it('should merge the reducer data with the form data', () => {
      mockAction = {
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          formName: 'test-page-abc123',
        }};
      mockCollector = jest.fn(() => () => ({ title: 'new' }));
      mockSelectors.getAllPages = jest.fn(() => ([
        { id: 'page1' },
        { id: 'abc123', title: 'test', image: 'yes' },
      ]));
      const expectedPageData = [{ id: 'page1' }, { id: 'abc123', title: 'new', image: 'yes' }];

      middleware(mockStore, mockSelectors, mockCollector)(mockNext)(mockAction);

      expect(mockAction.payload.requestData).toHaveProperty('pages', expectedPageData);
    });
  });

  describe('save sections form', () => {
    it('should merge the reducer data with the form data', () => {
      mockAction = {
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          formName: 'test-section-abc123',
        }};
      mockCollector = jest.fn(() => () => ({ title: 'new' }));
      mockSelectors.getAllSections = jest.fn(() => ({
        section1: 'testData',
        abc123: { title: 'oldTitle' },
      }));
      const expectedSectionData = { section1: 'testData', abc123: { title: 'new' }};

      middleware(mockStore, mockSelectors, mockCollector)(mockNext)(mockAction);

      expect(mockAction.payload.requestData).toHaveProperty('sections', expectedSectionData);
    });
  });
});
