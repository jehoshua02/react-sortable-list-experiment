import React from 'react';
import SortableList from 'components/SortableList';
import Item from 'components/Item';
import genIdFactory from 'util/genIdFactory';

var genId = genIdFactory();

var App = React.createClass({
  getInitialState: function () {
    return {
      items: [
        { id: genId(), name: 'Item 1' },
        { id: genId(), name: 'Item 2' },
        { id: genId(), name: 'Item 3' },
      ]
    };
  },

  render: function () {
    return (
      <SortableList>
        {this.state.items.map(function (item) {
          return <Item key={item.id}>{item.name}</Item>
        })}
      </SortableList>
    );
  }
});

export default App;
