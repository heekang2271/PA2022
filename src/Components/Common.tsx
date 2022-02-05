import React from 'react';
import styled from 'styled-components';

export const NAV_HEIGHT = 49;

export const ScrollHide = styled.div`
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const EditBtn = styled.button`
  padding: 5px 19px;
  border-radius: 9px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  min-width: 116px;
`;

export const EditInput = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 9px;
  padding: 13px;
  font-size: 16px;
  outline: none;

  &:focus {
    border: 1px solid ${(props) => props.theme.accentColor};
  }
`;

export const EditResult = styled.div`
  width: 100%;
  min-height: 86px;
  max-height: 150px;
  padding: 11px 12px;
  border-radius: 9px;
  border: 1px solid ${(props) => props.theme.borderColor};
  overflow-y: auto;
  color: #858585;

  .result {
    color: #000000;
  }
`;
