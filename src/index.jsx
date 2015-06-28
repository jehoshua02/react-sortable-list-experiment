import React from 'react';
import SortableList from 'components/SortableList';
import Item from 'components/Item';

var genId = (function () {
  var id = 0;
  return function () {
    return id++;
  };
})();

var state = {
  items: [
    { id: genId(), name: 'Item 1' },
    { id: genId(), name: 'Item 2' },
    { id: genId(), name: 'Item 3' },
  ]
};

React.render(
  <SortableList>
    {state.items.map(function (item) {
      return <Item key={item.id}>{item.name}</Item>
    })}
  </SortableList>,
  document.body
);
