import React from 'react/addons';
import {DragSourceConnector, DragSourceMonitor} from 'react-dnd';

var Type = React.PropTypes;
var emptyFunc = function () {};

var DragSource = React.createClass({

  propTypes: {
    type: Type.string.isRequired,

    beginDrag: Type.func.isRequired,
    endDrag: Type.func,
    canDrag: Type.func,
    isDragging: Type.func,

    collect: Type.func.isRequired,

    _connect: Type.instanceOf(DragSourceConnector).isRequired,
    _monitor: Type.instanceOf(DragSourceMonitor).isRequired,
  },

  getDefaultProps: function () {
    return {
      endDrag: emptyFunc,
      canDrag: emptyFunc,
      isDragging: emptyFunc,
    };
  },

  render: function () {
    var connect = this.props._connect.dragSource();
    return connect(this._child());
  },

  _child: function () {
    var child = React.Children.only(this.props.childen);
    return React.addons.cloneWithProps(child, this._props());
  },

  _props: function () {
    var {
      type,
      beginDrag,
      endDrag,
      canDrag,
      isDragging,
      collect,
      _connect,
      _monitor,
      ...props
    } = this.props;

    return Object.assign(props, collect(_connect, _monitor));
  }

});

var dragSource = {
  type: function (props) {
    return props.type;
  },
  spec: {
    beginDrag: function (props, monitor, component) {
      return props.beginDrag(props, monitor, component);
    },
    endDrag: function (props, monitor, component) {
      return props.endDrag(props, monitor, component);
    },
    canDrag: function (props, monitor) {
      return props.canDrag(props, monitor);
    },
    isDragging: function (props, monitor) {
      return props.isDragging(props, monitor);
    },
  },
  collect: function (connect, monitor) {
    return {
      _connect: connect,
      _monitor: monitor,
    };
  }
};

export default DragSource(dragSource.type, dragSource.spec, dragSource.collect)(DragSource);
