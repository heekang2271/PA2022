import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchGuide1, fetchGuide2 } from '../../api';
import { editState } from '../../atoms';
import Accordion from '../Accordion';
import { EditBtn, EditInput, EditResult } from '../Common';
import NotResult from './NotResult';

const SearchBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SearchBtn = styled(EditBtn)`
  background-color: #c3c3c3;
  margin-top: 8px;
`;

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

const ResultValue = styled.span`
  display: block;
`;

const ResultDOI = styled.span`
  display: block;
  color: ${(props) => props.theme.accentColor};

  span {
    color: #858585;
  }
`;

interface IGuide {
  title: string;
  type: number;
  propsRef: any;
  setInitHeight: Function;
}

interface IResult {
  loading: boolean;
  data?: {
    value: string;
    doi: string;
  }[];
}

type cntResult = number;

function Guide({ title, type, propsRef, setInitHeight }: IGuide) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<IResult>({
    loading: false,
  });
  const [cntResult, setCntResult] = useState<cntResult>();
  const setEditValue = useSetRecoilState(editState);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (result?.data?.length === 0) {
      setResult({
        loading: false,
      });
    }

    setValue(event.currentTarget.value);
  };

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setResult({
      loading: true,
    });

    const result =
      type === 1 ? await fetchGuide1(value) : await fetchGuide2(value);

    setResult({
      loading: false,
      data: result,
    });
    setCntResult(undefined);
  };

  const onResultClick = (newCurrent: number) => {
    setCntResult(newCurrent);
  };

  const onAddClick = (sentence: string) => {
    setEditValue((prev) => (prev === '' ? sentence : `${prev}\n${sentence}`));
  };

  return (
    <Accordion propsRef={propsRef} title={title} setInitHeight={setInitHeight}>
      <SearchBox>
        <EditInput
          value={value}
          onChange={onChange}
          placeholder="검색할 문장을 입력하세요."
        />
        <SearchBtn onClick={onClick}>Search</SearchBtn>
      </SearchBox>
      {result.loading
        ? 'loading...'
        : result?.data &&
          (result.data.length === 0 ? (
            value !== '' && <NotResult />
          ) : (
            <ResultContainer>
              {result.data.map((r, i) => {
                return (
                  <ResultBox
                    key={`generatorResult${i}`}
                    current={cntResult === i}
                  >
                    <EditResult onClick={() => onResultClick(i)}>
                      <ResultValue>{r.value}</ResultValue>
                      <ResultDOI>
                        <span>(</span>
                        {r.doi}
                        <span>)</span>
                      </ResultDOI>
                    </EditResult>
                    <AddBtn onClick={() => onAddClick(r.value)}>
                      Add Sentence
                    </AddBtn>
                  </ResultBox>
                );
              })}
            </ResultContainer>
          ))}
    </Accordion>
  );
}

export default Guide;
