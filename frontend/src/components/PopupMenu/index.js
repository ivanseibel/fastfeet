import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';

import { MenuContainer, ItemContainer } from './styles';

export default function PopupMenu(props) {
  const node = useRef();
  const { show, menuItems, toggle } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    function toggleShowMenu() {
      toggle(false);
    }
    function handleClick(e) {
      if (node.current.contains(e.target)) {
        const [item] = menuItems.filter(
          (menuItem) => menuItem.type === e.target.innerText
        );

        if (item) {
          item.method();
        }
      }
      toggleShowMenu();
    }

    if (show) {
      document.removeEventListener('mousedown', handleClick);
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [show, menuItems, dispatch, toggle]);

  const ItemIcon = {
    Details: MdVisibility,
    Edit: MdCreate,
    Delete: MdDeleteForever,
    'Cancel delivery': MdDeleteForever,
  };

  const IconColor = {
    Details: '#8e5be8',
    Edit: '#4d85ee',
    Delete: '#de3b3b',
    'Cancel delivery': '#de3b3b',
  };

  return (
    <MenuContainer show={show} ref={node}>
      {menuItems.map((item) => (
        <li key={item.type}>
          <ItemContainer type="button">
            {ItemIcon[item.type]({ color: IconColor[item.type] })}
            <span>{item.type}</span>
          </ItemContainer>
        </li>
      ))}
    </MenuContainer>
  );
}

PopupMenu.propTypes = {
  show: PropTypes.bool,
  menuItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  toggle: PropTypes.func.isRequired,
};

PopupMenu.defaultProps = {
  show: false,
};
