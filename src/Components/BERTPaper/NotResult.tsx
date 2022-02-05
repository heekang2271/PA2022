import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;

  span {
    color: #fc4a1e;
  }
`;

function NotResult() {
  return (
    <Container>
      <span>No results.</span>
    </Container>
  );
}

export default NotResult;
