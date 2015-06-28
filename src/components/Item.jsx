import React from 'react';

var Item = React.createClass({
  render: function () {
    return (
      <div
        style={{
          padding: 20,
          borderBottom: '1px solid #555'
        }}
      >{this.props.children}</div>
    );
  }
});

export default Item;
