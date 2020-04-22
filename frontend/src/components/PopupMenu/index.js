import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';

import { MenuContainer, ItemContainer } from './styles';

export default function PopupMenu(props) {
  const node = useRef();
  const { show, menuItems, toggleShowMenu } = props;

  useEffect(() => {
    function handleClick(e) {
      if (node.current.contains(e.target)) {
        const [item] = menuItems.filter(
          (menuItem) => menuItem.type === e.target.innerText
        );

        if (item) {
          item.method();
        } else {
          return;
        }
      }

      toggleShowMenu();
    }

    // add when mounted
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [menuItems, toggleShowMenu]);

  const ItemIcon = {
    Details: MdVisibility,
    Edit: MdCreate,
    Delete: MdDeleteForever,
  };

  const IconColor = {
    Details: '#8e5be8',
    Edit: '#4d85ee',
    Delete: '#de3b3b',
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
  toggleShowMenu: PropTypes.func.isRequired,
};

PopupMenu.defaultProps = {
  show: false,
};
