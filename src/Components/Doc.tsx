import React from 'react';
import styled from 'styled-components';
import { NAV_HEIGHT } from './Common';

const Navigation = styled.div`
  display: flex;
  align-items: center;
  padding: 0 19px;
  height: ${`${NAV_HEIGHT}px`};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.accentColor};
  font-size: 16px;
  font-weight: bold;
  position: relative;
  z-index: 1000;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
`;

function Doc({ children }: any) {
  return (
    <>
      <Navigation>
        <span>Project &gt; BERT Paper</span>
      </Navigation>
      {children}
    </>
  );
}

export default Doc;
