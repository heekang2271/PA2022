import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  BERTPaperState,
  BERTPaperWidthState,
  chapterState,
  editState,
} from '../../atoms';
import { ScrollHide } from '../Common';

interface IContainer {
  size: number;
}

// const Container = styled(ScrollHide)<IContainer>`
// background-color: ${(props) => props.theme.evenBgColor};
// border-left: 1px solid ${(props) => props.theme.borderColor};
// padding: 21px 15px;
// padding-bottom: 0;
//   width: ${(props) => `${props.size}px`};
// `;

const Container = styled(ScrollHide).attrs((props: any) => ({
  style: {
    width: `${props.size}px`,
  },
}))<IContainer>`
  background-color: ${(props) => props.theme.evenBgColor};
  border-left: 1px solid ${(props) => props.theme.borderColor};
  padding: 21px 15px;
  padding-bottom: 0;
`;

const GroupTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 7px;
`;

const GroupContents = styled.div`
  padding: 20px 18px;
  background-color: ${(props) => props.theme.bgColor};
`;

const ChapterTitle = styled.h5`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ChapterContents = styled.div`
  padding: 12px 8px;
  min-height: 115px;
  color: ${(props) => props.theme.softTextColor};
  cursor: pointer;
`;

interface IChapterBox {
  current: boolean;
}

const ChapterBox = styled.div<IChapterBox>`
  &:not(:last-child) {
    margin-bottom: 25px;
  }

  & ${ChapterTitle} {
    color: ${(props) =>
      props.current ? props.theme.accentColor : props.theme.softTextColor};
  }

  & ${ChapterContents} {
    background-color: ${(props) => (props.current ? '#dde6ff' : '#e1e1e1')};
    border: 1px solid
      ${(props) => (props.current ? props.theme.accentColor : '#e1e1e1')};
  }
`;

interface IGroupBox {
  current: boolean;
}

const GroupBox = styled.div<IGroupBox>`
  margin-bottom: 31px;

  & ${GroupTitle} {
    color: ${(props) =>
      props.current ? props.theme.accentColor : props.theme.softTextColor};
  }

  & ${GroupContents} {
    border: 1px solid
      ${(props) =>
        props.current ? props.theme.accentColor : props.theme.thickBorderColor};
  }
`;

interface IChapter {
  size: number;
}

function Chapter({ size }: IChapter) {
  const BERTPaper = useRecoilValue(BERTPaperState);
  const [cntChapter, setCntChapter] = useRecoilState(chapterState);
  const [widthRatio, setWidthRatio] = useRecoilState(BERTPaperWidthState);
  const setEditValue = useSetRecoilState(editState);

  const onClick = (group: string, chapter: string) => {
    if (cntChapter.group === group && cntChapter.chapter === chapter) {
      setWidthRatio({
        paper: widthRatio.paper + widthRatio.editor / 2,
        chapter: widthRatio.chapter + widthRatio.editor / 2,
        editor: widthRatio.editor,
      });
      setCntChapter({
        group: '',
        chapter: '',
      });
    } else {
      const groupIndex = BERTPaper.findIndex((g) => g.title === group);
      const chapterIndex = BERTPaper[groupIndex].chapters.findIndex(
        (chap) => chap.title === chapter
      );

      if (cntChapter.group === '' && cntChapter.chapter === '') {
        const editorRatio = widthRatio.editor === 0 ? 0.33 : widthRatio.editor;
        setWidthRatio({
          paper: widthRatio.paper - editorRatio / 2,
          chapter: widthRatio.chapter - editorRatio / 2,
          editor: editorRatio,
        });
      }

      setCntChapter({
        group,
        chapter,
      });
      setEditValue(BERTPaper[groupIndex].chapters[chapterIndex].contents);
    }
  };

  return (
    <Container size={size}>
      {BERTPaper.map((group) => {
        return (
          <GroupBox
            key={group.title}
            current={cntChapter.group === group.title}
          >
            <GroupTitle>{group.title}</GroupTitle>
            <GroupContents>
              {group.chapters.map((chap) => {
                return (
                  <ChapterBox
                    key={`${group.title}/${chap.title}`}
                    current={
                      group.title === cntChapter.group &&
                      chap.title === cntChapter.chapter
                    }
                    onClick={() => onClick(group.title, chap.title)}
                  >
                    {chap.title !== '' && (
                      <ChapterTitle>{chap.title}</ChapterTitle>
                    )}
                    <ChapterContents>
                      <p>{chap.contents}</p>
                    </ChapterContents>
                  </ChapterBox>
                );
              })}
            </GroupContents>
          </GroupBox>
        );
      })}
    </Container>
  );
}

export default Chapter;
