import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchTword } from '../../api';
import { editState } from '../../atoms';
import Accordion from '../Accordion';
import { EditBtn, EditResult } from '../Common';
import NotResult from './NotResult';

const AddBtn = styled(EditBtn)`
  margin-top: 9px;
  background-color: #818181;
`;

const ResultContainer = styled.div`
  margin-top: 21px;
`;

interface IResultBox {
  current: boolean;
}

const ResultBox = styled.div<IResultBox>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  ${AddBtn} {
    display: ${(props) => (props.current ? 'block' : 'none')};
  }

  & > div {
    border: 1px solid
      ${(props) =>
        props.current ? props.theme.accentColor : props.theme.borderColor};
  }
`;

interface ITword {
  propsRef: any;
  setInitHeight: Function;
  tword: string;
}

type cntResult = number;

function Tword({ propsRef, setInitHeight, tword }: ITword) {
  const setEditValue = useSetRecoilState(editState);
  const { isLoading, data } = useQuery(['twordResult', tword], () =>
    fetchTword(tword)
  );
  const [cntResult, setCntResult] = useState<cntResult>();

  const onResultClick = (newCurrent: number) => {
    setCntResult(newCurrent);
  };

  const onAddClick = (sentence: string) => {
    const $tempDiv = document.createElement('div');
    $tempDiv.innerHTML = sentence;
    setEditValue((prev) =>
      prev === '' ? $tempDiv.innerText : `${prev}\n${$tempDiv.innerText}`
    );
  };

  return (
    <Accordion
      propsRef={propsRef}
      title="접속사 추천"
      setInitHeight={setInitHeight}
    >
      {isLoading
        ? 'loading...'
        : data &&
          (data.length === 0 ? (
            tword !== '' && <NotResult />
          ) : (
            <ResultContainer>
              {data.map((sentence, i) => {
                return (
                  <ResultBox
                    key={`generatorResult${i}`}
                    current={cntResult === i}
                  >
                    <EditResult
                      // onClick={() => onResultClick(i)}
                      dangerouslySetInnerHTML={{ __html: sentence }}
                    ></EditResult>
                    {/* <AddBtn onClick={() => onAddClick(sentence)}>
                      Add Sentence
                    </AddBtn> */}
                  </ResultBox>
                );
              })}
            </ResultContainer>
          ))}
    </Accordion>
  );
}

export default Tword;
