import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 0 17px;
`;

const Title = styled.div`
  padding: 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  & > span:last-child {
    color: #818181;
    font-size: 20px;
  }
`;

const Contents = styled.div`
  padding-bottom: 23px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;

interface IAccordion {
  title: string;
  children: any;
  propsRef: any;
  setInitHeight: Function;
}

function Accordion({ title, children, propsRef, setInitHeight }: IAccordion) {
  const [open, setOpen] = useState(true);
  const onClick = () => {
    setOpen((prev) => !prev);
    setInitHeight();
  };
  return (
    <Container ref={propsRef}>
      <Title onClick={onClick}>
        <span>{title}</span>
        <span>{open ? '▲' : '▼'}</span>
      </Title>
      {open && <Contents>{children}</Contents>}
    </Container>
  );
}

export default Accordion;
