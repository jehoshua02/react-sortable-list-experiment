import React from 'react/addons';
import {DropTargetConnector, DropTargetMonitor} from 'react-dnd';

var Type = React.PropTypes;

var DropTarget = React.createClass({

  propTypes: {
    types: Type.arrayOf(Type.string).isRequired,

    drop: Type.func,
    hover: Type.func,
    canDrop: Type.func,

    _connect: Type.object.isRequired,
    _monitor: Type.object.isRequired,
  },

  render: function () {
    var connect = this.props._connect.dropTarget();
    return connect(this._child());
  },

  _child: function () {
    var child = React.Children.only(this.props.children);
    return React.addons.cloneWithProps(child, this._props());
  },

  _props: function () {
    var {
      types,
      drop,
      hover,
      canDrop,
      _connect,
      _monitor,
      children,
      ...props
    } = this.props;

    return Object.assign(props, collect(_connect, _monitor));
  }

});

var dropTarget = {
  types: function (props) {
    return props.types;
  },
  spec: {
    drop: function (props, monitor, component) {
      return props.drop(props, monitor, component);
    },
    hover: function (props, monitor, component) {
      return props.hover(props, monitor, component);
    },
    canDrop: function (props, monitor) {
      return props.canDrop(props, monitor);
    }
  },
  collect: function (connect, monitor) {
    return {
      _connect: connect,
      _monitor: monitor,
    };
  }
};

export default DropTarget(dropTarget.types, dropTarget.spec, dropTarget.collect)(DropTarget);
