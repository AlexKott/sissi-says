import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InscrybMDE from 'inscrybmde';

import * as actions from '@/actions';
import { SUCCESS } from '@/constants';

import ImagePopup from './ImagePopup';

const mapDispatchToProps = (dispatch) => ({
  onSelectImage: (image) => {
    const markdownString = `![](/images/${image})`;
    const alertString = `Please copy this line and paste it in your content:\n${markdownString}`;
    dispatch(actions.setAlert(SUCCESS, alertString));
  },
});

let count = 0;

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isImagePopupActive: false,
    };

    this.onSelectImage = this.onSelectImage.bind(this);
    this.onToggleImagePopup = this.onToggleImagePopup.bind(this);
  }

  componentDidMount() {
    count++;
    const nodeList = document.querySelectorAll('.markdown-editor');
    const mde = new InscrybMDE({
      blockStyles: {
        italic: '_',
      },
      element: nodeList.item(count - 1),
      minHeight: '220px',
      placeholder: this.props.placeholder,
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
            this.onToggleImagePopup();
          }.bind(this),
        },
      ],
    });
    mde.codemirror.on('change', () => this.props.input.onChange(mde.value()));
  }

  componentWillUnmount() {
    count--;
  }

  onToggleImagePopup() {
    this.setState({
      isImagePopupActive: !this.state.isImagePopupActive,
    });
  }

  onSelectImage(image) {
    this.props.onSelectImage(image);
    this.onToggleImagePopup();
  }

  render() {
    const {
      input,
    } = this.props;

    return ([
      this.state.isImagePopupActive &&
        <ImagePopup
          key={`image-popup-${count}`}
          onSelectImage={this.onSelectImage}
        />
      ,
      <div key='markdown-editor' className='markdown-editor__wrapper'>
        <textarea className='markdown-editor' {...input} />
      </div>
    ]);
  }
}

MarkdownEditor.propTypes = {
  input: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(MarkdownEditor);
