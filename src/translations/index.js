import alerts from './alerts';
import buttons from './buttons';
import editor from './editor';
import welcome from './welcome';

export * from './alerts';
export * from './buttons';
export * from './editor';
export * from './welcome';

export default {
  ...alerts,
  ...buttons,
  ...editor,
  ...welcome,
};
