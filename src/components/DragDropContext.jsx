import React from 'react/addons';
import {DragDropContext as Context} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

var DragDropContext = React.createClass({
  render: function () {
    return React.Children.only(this.props.children);
  }
});

export default Context(HTML5Backend)(DragDropContext);
