import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchGenerator } from '../../api';
import { editState } from '../../atoms';
import Accordion from '../Accordion';
import { EditBtn, EditInput, EditResult } from '../Common';

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

interface IResult {
  loading: boolean;
  data?: string[];
}

type cntResult = number;

function Generator({ propsRef, setInitHeight }: any) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<IResult>({
    loading: false,
  });
  const [cntResult, setCntResult] = useState<cntResult>();
  const setEditValue = useSetRecoilState(editState);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setResult({
      loading: true,
    });

    const result = await fetchGenerator(value);

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
    <Accordion
      propsRef={propsRef}
      title="문장 생성"
      setInitHeight={setInitHeight}
    >
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
        : result?.data && (
            <ResultContainer>
              {result.data.map((sentence, i) => {
                return (
                  <ResultBox
                    key={`generatorResult${i}`}
                    current={cntResult === i}
                  >
                    <EditResult onClick={() => onResultClick(i)}>
                      {sentence}
                    </EditResult>
                    <AddBtn onClick={() => onAddClick(sentence)}>
                      Add Sentence
                    </AddBtn>
                  </ResultBox>
                );
              })}
            </ResultContainer>
          )}
    </Accordion>
  );
}

export default Generator;
