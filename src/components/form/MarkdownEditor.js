import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InscrybMDE from 'inscrybmde';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import ImagePopup from './ImagePopup';

const mapStateToProps = (state) => ({
  isImagePopupActive: selectors.getDisplayImagePopup(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenImagePopup: () => dispatch(actions.togglePopup('image', true)),
  onSelectImage: (image) => {
    const markdownString = `![](/images/${image})`;
    const alertString = `Please copy this line and paste it in your content:\n${markdownString}`;
    dispatch(actions.setAlert(alertString, 'success'));
    dispatch(actions.togglePopup('image', false));
  },
});

class MarkdownEditor extends React.Component {

  componentDidMount() {
    const mde = new InscrybMDE({
      blockStyles: {
        italic: '_',
      },
      element: document.querySelector('.markdown-editor'),
      minHeight: '220px',
      spellChecker: false,
      status: false,
      toolbar: [
        'heading',
        'italic',
        'unordered-list',
        'link',
        {
          name: 'image',
          className: 'fa fa-picture-o',
          title: 'Insert Image',
          action: function selectImage(editor) {
            this.props.onOpenImagePopup();
          }.bind(this),
        },
      ],
    });
    mde.codemirror.on('change', () => this.props.input.onChange(mde.value()));
  }

  render() {
    const {
      isImagePopupActive,
      input,
      onSelectImage,
    } = this.props;

    return ([
      isImagePopupActive && <ImagePopup key='image-popup' onSelectImage={onSelectImage} />
      ,
      <div key='markdown-editor' className='markdown-editor__wrapper'>
        <textarea className='markdown-editor' {...input} />
      </div>
    ]);
  }
}

MarkdownEditor.propTypes = {
  isImagePopupActive: PropTypes.bool,
  input: PropTypes.object,
  onSelectImage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditor);
