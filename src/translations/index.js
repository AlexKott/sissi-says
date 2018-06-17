import buttons from './buttons';
import editor from './editor';
import modal from './modal';
import welcome from './welcome';

export * from './buttons';
export * from './editor';
export * from './modal';
export * from './welcome';

export default {
  ...buttons,
  ...editor,
  ...modal,
  ...welcome,
};
