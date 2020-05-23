import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Content, Profile, MenuItem, LogoffLink } from './styles';
import logo from '../../assets/logo.svg';

import { signOffRequest } from '../../store/modules/auth/actions';

export default function Header() {
  const { activeScreen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogoff() {
    dispatch(signOffRequest());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <MenuItem to="/deliveries" selected={activeScreen === 'deliveries'}>
            DELIVERIES
          </MenuItem>
          <MenuItem to="/deliverymen" selected={activeScreen === 'deliverymen'}>
            DELIVERYMEN
          </MenuItem>
          <MenuItem to="/recipients" selected={activeScreen === 'recipients'}>
            RECIPIENTS
          </MenuItem>
          <MenuItem to="/issues" selected={activeScreen === 'issues'}>
            ISSUES
          </MenuItem>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Ivan L. Seibel</strong>
              <span>
                <LogoffLink onClick={handleLogoff}>Logoff</LogoffLink>
              </span>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
