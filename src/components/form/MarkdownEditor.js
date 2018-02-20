import React from 'react';

class MarkdownEditor expands React.Component {
  render() {
    const { input } = this.props;
    return (
      <textarea {...input} />
    );
  }
}

export default MarkdownEditor;
