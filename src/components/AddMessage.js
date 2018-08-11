import React from 'react';
import lifecycle from 'react-pure-lifecycle';

let input;

const methods = {
  componentDidMount: () => input && input.focus()
};

const AddMessage = props => (
  <section id="new-message">
    <input
      onKeyDown={e => {
        if (e.key === 'Enter') {
          props.dispatch(input.value, 'Me');
          input.value = '';
        }
      }}
      ref={node => input = node}
      />
  </section>
  );

export default lifecycle(methods)(AddMessage);
