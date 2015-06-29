import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import DragSource from 'components/DragSource';
import Item from 'components/Item';
import genIdFactory from 'util/genIdFactory';

var genId = genIdFactory();

var App = React.createClass({
  getInitialState: function () {
    return {
      items: [
        { id: genId(), name: 'Item 1' },
        // { id: genId(), name: 'Item 2' },
        // { id: genId(), name: 'Item 3' },
      ]
    };
  },

  render: function () {
    return (
      <div>
        {this.state.items.map(function (item) {
          return (
            <DragSource
              key={item.id}
              type="Item"
              beginDrag={function (props, monitor, component) {
                console.log('beginDrag'); return item;
              }}
              endDrag={function () {
                console.log('endDrag');
              }}
              canDrag={function () {
                console.log('canDrag');
                return true;
              }}
              isDragging={function (props, monitor) {
                console.log('isDragging');
                return monitor.getItem() == props.beginDrag();
              }}
              collect={function (connect, monitor) {
                console.log('custom collect');
                console.log({
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
                });
                return {isDragging: monitor.isDragging()};
              }}
            >
              <Item>{item.name}</Item>
            </DragSource>
          );
        })}
      </div>
    );
  }
});

export default DragDropContext(HTML5Backend)(App);
