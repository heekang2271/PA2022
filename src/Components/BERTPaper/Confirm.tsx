import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchConfirm } from '../../api';
import { editState, BERTPaperState, chapterState } from '../../atoms';
import { EditBtn } from '../Common';

const ConfirmBox = styled.div`
  position: relative;
  z-index: 10;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
  padding: 18px;
  padding-top: 21px;
`;

const ConfirmTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 11px;
`;

const ConfirmContents = styled.textarea`
  background-color: #cdd7f3;
  border-radius: 9px;
  padding: 16px 13px;
  width: 100%;
  height: 163px;
  font-size: 16px;
`;

const ConfirmAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 11px;
`;

const WordCount = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #abaaaa;
`;

const ConfirmBtn = styled(EditBtn)`
  background-color: ${(props) => props.theme.accentColor};
`;

function Confirm() {
  const [editValue, setEditValue] = useRecoilState(editState);
  const setBERTPaper = useSetRecoilState(BERTPaperState);
  const chapter = useRecoilValue(chapterState);

  const onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setEditValue(event.currentTarget.value);
  };
  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const confirmResult = await fetchConfirm(editValue);

    setBERTPaper((prev) => {
      const newBERTPaper = [...prev];
      const groupIndex = newBERTPaper.findIndex(
        (group) => group.title === chapter.group
      );
      const chapterIndex = newBERTPaper[groupIndex].chapters.findIndex(
        (chap) => chap.title === chapter.chapter
      );

      const newGroup = { ...newBERTPaper[groupIndex] };
      const newChapter = { ...newGroup.chapters[chapterIndex] };
      newChapter.contents = confirmResult;

      const newChapters = [
        ...newGroup.chapters.slice(0, chapterIndex),
        newChapter,
        ...newGroup.chapters.slice(chapterIndex + 1),
      ];

      newGroup.chapters = newChapters;
      newBERTPaper[groupIndex] = newGroup;

      return newBERTPaper;
    });
  };

  return (
    <ConfirmBox>
      <ConfirmTitle>
        {chapter.chapter === ''
          ? chapter.group
          : `${chapter.group}/${chapter.chapter}`}
      </ConfirmTitle>
      <ConfirmContents value={editValue} onChange={onChange} />
      <ConfirmAction>
        <WordCount>{editValue.length} words</WordCount>
        <ConfirmBtn onClick={onClick}>Confirm</ConfirmBtn>
      </ConfirmAction>
    </ConfirmBox>
  );
}

export default Confirm;
