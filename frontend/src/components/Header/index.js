import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Content, Profile, MenuItem } from './styles';
import logo from '../../assets/logo.svg';

export default function Header() {
  const { activeScreen } = useSelector((state) => state.auth);
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
              <span>Logoff</span>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
