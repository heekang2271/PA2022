import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  BERTPaperMinWidth,
  BERTPaperWidthSelector,
  BERTPaperWidthState,
  chapterState,
  docWidthState,
} from '../../atoms';

interface IButton {
  left: number;
}

const Button = styled.button.attrs((props: any) => ({
  style: {
    left: `${props.left}px`,
  },
}))<IButton>`
  width: 45px;
  height: 45px;
  top: 50%;
  background-color: #7d7d7d;
  border-radius: 100%;
  position: absolute;
  border: none;
  outline: none;
  transform: translateX(-50%) translateY(-50%);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  & > span {
    position: relative;
    top: 2px;
    color: #ffffff;
  }

  z-index: 100;
`;

interface IResizeBtn {
  left: number;
  btnId: number;
}

function ResizeBtn({ left, btnId }: IResizeBtn) {
  const docWidth = useRecoilValue(docWidthState);
  const [widthRatio, setWidthRatio] = useRecoilState(BERTPaperWidthState);
  // const BERTPaperWidth = useRecoilValue(BERTPaperWidthSelector);

  const [mouseDown, setMouseDown] = useState(false);

  const onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMouseDown(true);
  };

  const onMouseMove = (event: any) => {
    if (mouseDown) {
      if (btnId === 0) {
        const paperRatio = event.clientX / docWidth;
        const chapterRatio =
          widthRatio.chapter + (widthRatio.paper - paperRatio);

        if (
          paperRatio * docWidth >= BERTPaperMinWidth.paper &&
          chapterRatio * docWidth >= BERTPaperMinWidth.chapter
        ) {
          setWidthRatio({
            ...widthRatio,
            paper: paperRatio,
            chapter: chapterRatio,
          });
        }
      } else if (btnId === 1) {
        const chapterRatio = event.clientX / docWidth - widthRatio.paper;
        const editorRatio =
          widthRatio.editor + (widthRatio.chapter - chapterRatio);

        if (
          chapterRatio * docWidth >= BERTPaperMinWidth.chapter &&
          editorRatio * docWidth >= BERTPaperMinWidth.editor
        ) {
          setWidthRatio({
            ...widthRatio,
            chapter: chapterRatio,
            editor: editorRatio,
          });
        }
      }
    }
  };

  const onMouseUp = () => {
    setMouseDown(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [mouseDown]);

  return (
    <Button left={left} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <span>◀</span>
      <span>▶</span>
    </Button>
  );
}

export default ResizeBtn;
