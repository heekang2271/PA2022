import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchTranslator } from '../../api';
import { editState } from '../../atoms';
import Accordion from '../Accordion';
import { EditBtn } from '../Common';
import NotResult from './NotResult';

const TranslateBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TranslateBtn = styled(EditBtn)`
  background-color: #c3c3c3;
  margin-top: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 119px;
  border-radius: 9px;
  padding: 19px 12px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.borderColor};

  &:focus {
    border: 1px solid ${(props) => props.theme.accentColor};
  }
`;

const ResultBox = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const ResultArea = styled(TextArea)`
  background-color: #e4e4e4;
  width: 100%;
  border: 1px solid #e4e4e4;
  overflow-y: auto;
`;

const AddBtn = styled(EditBtn)`
  margin-top: 9px;
  background-color: #818181;
`;

interface IResult {
  loading: boolean;
  data?: string;
}

function Translator({ propsRef, setInitHeight }: any) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<IResult>({
    loading: false,
  });
  const setEditValue = useSetRecoilState(editState);

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
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

    const result = await fetchTranslator(value);

    setResult({
      loading: false,
      data: result,
    });
  };

  const onAddClick = (sentence: string) => {
    setEditValue((prev) => (prev === '' ? sentence : `${prev}\n${sentence}`));
  };

  return (
    <Accordion
      propsRef={propsRef}
      title="Translate"
      setInitHeight={setInitHeight}
    >
      <TranslateBox>
        <TextArea value={value} onChange={onChange} />
        <TranslateBtn onClick={onClick}>Translate</TranslateBtn>
      </TranslateBox>
      {result.loading
        ? 'loading...'
        : result?.data !== undefined &&
          (result.data === '' ? (
            <NotResult />
          ) : (
            <ResultBox>
              <ResultArea as="div">{result.data}</ResultArea>
              <AddBtn onClick={() => result.data && onAddClick(result.data)}>
                Add Sentence
              </AddBtn>
            </ResultBox>
          ))}
    </Accordion>
  );
}

export default Translator;
