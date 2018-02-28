import React from 'react';
import { connect } from 'react-redux';
import InscrybMDE from 'inscrybmde';

import * as actions from '@/actions/creators';

import ImagePopup from './ImagePopup';

const mapDispatchToProps = (dispatch) => ({
  onSelectImage: (markdownString) => dispatch(actions.setAlert(markdownString, 'success')),
});

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isImagePopupActive: false,
    };

    this.closeImagePopup = this.closeImagePopup.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  closeImagePopup(e) {
    if (e.target.id === 'image-popup') {
      this.setState(() => ({ isImagePopupActive: false }));
    }
  }

  selectImage(image) {
    const imageUrl = `/images/${image}`;
    const markdownString = `![](${imageUrl})`;
    const alertString = `Please copy the following line and paste it where you want to place the image:\n${markdownString}`;
    this.props.onSelectImage(alertString);
    this.setState(() => ({ isImagePopupActive: false }));
  }

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
            this.setState({ isImagePopupActive: true });
          }.bind(this),
        },
      ],
    });

    mde.codemirror.on('change', () => this.props.input.onChange(mde.value()));
  }

  render() {
    const { input } = this.props;
    return (
      <div className='markdown-editor__wrapper'>
        <textarea className='markdown-editor' {...input} />
        {this.state.isImagePopupActive && <ImagePopup
          onClosePopup={this.closeImagePopup}
          onSelectImage={this.selectImage}
        />}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(MarkdownEditor);
