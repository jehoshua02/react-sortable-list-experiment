import React from 'react';

var Item = React.createClass({
  render: function () {
    console.log(this.props);
    return (
      <div
        style={{
          padding: 20,
          borderBottom: '1px solid #555',
          backgroundColor: this.props.isDragging ? 'green' : 'white'
        }}
      >{this.props.children}</div>
    );
  }
});

export default Item;
