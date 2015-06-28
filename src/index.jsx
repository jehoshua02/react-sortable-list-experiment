import React from 'react';
import SortableList from 'components/SortableList';
import Item from 'components/Item';

React.render(
  <SortableList>
    <Item>Item1</Item>
    <Item>Item1</Item>
  </SortableList>,
  document.body
);
