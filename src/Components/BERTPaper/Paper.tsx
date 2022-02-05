import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BERTPaperState, BERTPaperMinWidth } from '../../atoms';
import { ScrollHide } from '../Common';

interface IContainer {
  size: number;
}

const Container = styled(ScrollHide).attrs((props: any) => ({
  style: {
    width: `${props.size}px`,
  },
}))<IContainer>`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 26px 22px 0 17px;
  min-width: ${`${BERTPaperMinWidth.paper}px`};
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 63px;
`;

const Contents = styled.div`
  padding-left: 12px;
`;

const Chapter = styled.div`
  margin-bottom: 69px;

  & > h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 7px;
  }

  & > p {
    font-size: 13px;
  }
`;

interface IPaper {
  size: number;
}

function Paper({ size }: IPaper) {
  const BERTPaper = useRecoilValue(BERTPaperState);

  return (
    <Container size={size}>
      {BERTPaper[0]?.chapters[0]?.contents !== '' && (
        <Title>{BERTPaper[0]?.chapters[0]?.contents}</Title>
      )}
      <Contents>
        {BERTPaper.map((group, i) => {
          if (i === 0) return null;

          return (
            <Chapter key={`paper${i}`}>
              <h3>{group.title}</h3>
              <p>
                {group.chapters.map((chapter, j) => (
                  <span key={`chapter${i}${j}`}>{chapter.contents}</span>
                ))}
              </p>
            </Chapter>
          );
        })}
      </Contents>
    </Container>
  );
}

export default Paper;
