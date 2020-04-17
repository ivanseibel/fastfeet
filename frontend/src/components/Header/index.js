import React, { useState } from 'react';

import { Container, Content, Profile, MenuItem } from './styles';
import logo from '../../assets/logo.svg';

export default function Header() {
  const [screen, setScreen] = useState('deliveries');
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <MenuItem
            onClick={() => {
              setScreen('deliveries');
            }}
            to="/deliveries"
            selected={screen === 'deliveries'}
          >
            DELIVERIES
          </MenuItem>
          <MenuItem
            onClick={() => {
              setScreen('deliverymans');
            }}
            to="/deliverymans"
            selected={screen === 'deliverymans'}
          >
            DELIVERYMANS
          </MenuItem>
          <MenuItem
            onClick={() => {
              setScreen('recipients');
            }}
            to="/recipients"
            selected={screen === 'recipients'}
          >
            RECIPIENTS
          </MenuItem>
          <MenuItem
            onClick={() => {
              setScreen('issues');
            }}
            to="/issues"
            selected={screen === 'issues'}
          >
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
