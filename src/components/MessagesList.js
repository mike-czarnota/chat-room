import React from 'react';

const Sidebar = ({ messages }) => (
  <section id="messages-list">
    {messages.map(msg => (
      <p key={msg.id}>
        <i>{msg.author}</i>: {msg.message}
      </p>
      ))}
  </section>
  );

export default Sidebar;
