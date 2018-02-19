import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

const QuillEditor = ({ input }) => (
  <div>
    <ReactQuill
      {...input}
      onChange={(newValue, delta, source) => {
        if (source === 'user') {
          input.onChange(newValue);
        }
      }}
      onBlur={(range, source, quill) => {
        input.onBlur(quill.getHTML());
      }}
    />
  </div>
);

export default QuillEditor;
