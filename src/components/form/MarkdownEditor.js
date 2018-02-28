import React from 'react';
import InscrybMDE from 'inscrybmde';

class MarkdownEditor extends React.Component {
  componentDidMount() {
    const mde = new InscrybMDE({
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
            console.log('custom image selection');
          },
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
      </div>
    );
  }
}

export default MarkdownEditor;
