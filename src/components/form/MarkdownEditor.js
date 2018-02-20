import React from 'react';
import InscrybMDE from 'inscrybmde';

class MarkdownEditor extends React.Component {
  componentDidMount() {
    const mde = new InscrybMDE({
      element: document.querySelector('.markdown-editor'),
      spellChecker: false,
      status: false,
      toolbar: [
        'heading',
        'italic',
        'unordered-list',
        'link',
        'image',
      ],
    });

    mde.codemirror.on('change', () => this.props.input.onChange(mde.value()));
  }

  render() {
    const { input, meta } = this.props;
    return (
      <div className='markdown-editor__wrapper'>
        <textarea className='markdown-editor' {...input} />
      </div>
    );
  }
}

export default MarkdownEditor;
