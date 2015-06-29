import React from 'react/addons';
import {DragSource as DnDSource} from 'react-dnd';

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

    _connect: Type.object.isRequired,
    _monitor: Type.object.isRequired,
  },

  getDefaultProps: function () {
    return {
      endDrag: emptyFunc,
      canDrag: emptyFunc,
      isDragging: emptyFunc,
    };
  },

  render: function () {
    var connect = this.props._connect;
    return connect.dragSource()(this._child());
  },

  _child: function (props) {
    var child = React.Children.only(this.props.children);
    return React.addons.cloneWithProps(child, this._props(props));
  },

  _props: function (additionalProps) {
    var {
      type,
      beginDrag,
      endDrag,
      canDrag,
      isDragging,
      collect,
      _connect,
      _monitor,
      children,
      ...props
    } = this.props;

    return Object.assign(props, collect(_connect, _monitor), additionalProps);
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
      if (typeof props.endDrag === 'function') {
        return props.endDrag(props, monitor, component);
      }
    },
    canDrag: function (props, monitor) {
      if (typeof props.canDrag === 'function') {
        return props.canDrag(props, monitor);
      } else {
        return true;
      }
    },
    isDragging: function (props, monitor) {
      if (typeof props.isDragging === 'function') {
        return props.isDragging(props, monitor);
      } else {
        return monitor.getItem() == props.beginDrag();
      }
    },
  },
  collect: function (connect, monitor) {
    return {
      _connect: connect,
      _monitor: monitor,
      monitor: {
        canDrag: monitor.canDrag(),
        isDragging: monitor.isDragging(),
        itemType: monitor.getItemType(),
        item: monitor.getItem(),
        dropResult: monitor.getDropResult(),
        didDrop: monitor.didDrop(),
        initialClientOffset: monitor.getInitialClientOffset(),
        initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
        clientOffset: monitor.getClientOffset(),
        differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
        sourceClientOffset: monitor.getSourceClientOffset(),
      }
    };
  }
};

export default DnDSource(dragSource.type, dragSource.spec, dragSource.collect)(DragSource);
