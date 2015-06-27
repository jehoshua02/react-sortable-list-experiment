import React from 'react';

var SortableList = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export default SortableList;
