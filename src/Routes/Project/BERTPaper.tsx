import React, { useEffect } from 'react';
import styled from 'styled-components';
import Chapter from '../../Components/BERTPaper/Chapter';
import Editor from '../../Components/BERTPaper/Editor';
import Paper from '../../Components/BERTPaper/Paper';
import Doc from '../../Components/Doc';
import { NAV_HEIGHT } from '../../Components/Common';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BERTPaperState,
  BERTPaperWidthSelector,
  chapterState,
  userState,
} from '../../atoms';
import { fetchBERTPaper } from '../../api';
import ResizeBtn from '../../Components/BERTPaper/ResizeBtn';

const Container = styled.div`
  display: flex;
  position: relative;
  height: ${`calc(100vh - ${NAV_HEIGHT}px)`};
  & > div {
    height: 100%;
  }
`;

function BERTPaper() {
  const [BERTPaper, setBERTPaper] = useRecoilState(BERTPaperState);
  const BERTPaperWidth = useRecoilValue(BERTPaperWidthSelector);
  const cntChapter = useRecoilValue(chapterState);
  const { userId } = useRecoilValue(userState);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBERTPaper(userId);
      setBERTPaper(data);
    };

    getData();
  }, []);

  return (
    <Doc>
      <Container>
        {BERTPaper !== [] && (
          <>
            <Paper size={BERTPaperWidth.paper} />
            <ResizeBtn left={BERTPaperWidth.paper} btnId={0} />
            <Chapter size={BERTPaperWidth.chapter} />
            {(cntChapter.group !== '' || cntChapter.chapter !== '') && (
              <>
                <ResizeBtn
                  left={BERTPaperWidth.paper + BERTPaperWidth.chapter}
                  btnId={1}
                />
                <Editor size={BERTPaperWidth.editor} />
              </>
            )}
          </>
        )}
      </Container>
    </Doc>
  );
}

export default BERTPaper;
