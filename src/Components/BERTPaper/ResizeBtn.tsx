import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { BERTPaperWidthState, chapterState, docWidthState } from '../../atoms';

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

// const Button = styled.button<IButton>`
//   width: 45px;
//   height: 45px;
//   top: 50%;
//   left: ${({ left }) => `${left}px`};
//   background-color: #7d7d7d;
//   border-radius: 100%;
//   position: absolute;
//   border: none;
//   outline: none;
//   transform: translateX(-50%) translateY(-50%);
//   cursor: pointer;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 18px;

//   & > span {
//     position: relative;
//     top: 2px;
//     color: #ffffff;
//   }

//   z-index: 100;
// `;

interface IResizeBtn {
  left: number;
  btnId: number;
}

function ResizeBtn({ left, btnId }: IResizeBtn) {
  const docWidth = useRecoilValue(docWidthState);
  const [widthRatio, setWidthRatio] = useRecoilState(BERTPaperWidthState);

  const [mouseDown, setMouseDown] = useState(false);

  const onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMouseDown(true);
  };

  const onMouseMove = (event: any) => {
    if (mouseDown) {
      if (btnId === 0) {
        const paperRatio = event.clientX / docWidth;
        setWidthRatio({
          ...widthRatio,
          paper: paperRatio,
          chapter: widthRatio.chapter + (widthRatio.paper - paperRatio),
        });
      } else if (btnId === 1) {
        const chapterRatio = event.clientX / docWidth - widthRatio.paper;
        setWidthRatio({
          ...widthRatio,
          chapter: chapterRatio,
          editor: widthRatio.editor + (widthRatio.chapter - chapterRatio),
        });
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
