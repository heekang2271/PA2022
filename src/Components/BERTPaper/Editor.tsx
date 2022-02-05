import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { engineState, BERTPaperMinWidth } from '../../atoms';
import { ScrollHide } from '../Common';
import Confirm from './Confirm';
import Generator from './Generator';
import Guide from './Guide';
import Translator from './Translator';
import Tword from './Tword';

const ENGINE_LIST_WIDTH = 58;

interface IContainer {
  size: number;
}

const Container = styled(ScrollHide).attrs((props: any) => ({
  style: {
    width: `${props.size}px`,
  },
}))<IContainer>`
  background-color: ${(props) => props.theme.bgColor};
  border-left: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  min-width: ${`${BERTPaperMinWidth.editor}px`};
`;

const EngineList = styled(ScrollHide)`
  position: relative;
  z-index: 20;
  background-color: ${(props) => props.theme.bgColor};
  min-width: ${`${ENGINE_LIST_WIDTH}px`};
  border-right: 1px solid ${(props) => props.theme.borderColor};
  padding-top: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 62px;
`;

interface IEngineBtn {
  current: boolean;
}

const EngineBtn = styled.button<IEngineBtn>`
  background-color: transparent;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) =>
    props.current ? props.theme.accentColor : props.theme.textColor};
`;

const EditContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EngineBox = styled(ScrollHide)<any>`
  height: 100%;
  scroll-snap-type: y mandatory;

  & > div {
    scroll-snap-align: start;
  }
`;

interface IEditor {
  size: number;
  $engineBox: any;
  tword: string;
}

function Editor({ size, $engineBox, tword }: IEditor) {
  const $engines = useRef<any>([]);
  const [cntEngine, setCntEngine] = useRecoilState(engineState);

  const setInitHeight = () => {
    $engineBox.current.style.paddingBottom = `${
      $engineBox.current.clientHeight -
      $engines.current[$engines.current.length - 1].clientHeight
    }px
    `;
  };

  const onClick = (index: number) => {
    setInitHeight();

    let y = 0;

    for (let i = 0; i < index; i++) {
      y += $engines.current[i].clientHeight;
    }

    $engineBox.current.scrollTo(0, y);
    setCntEngine(index);
  };

  const engineList = [
    {
      title: '생성',
      contents: (
        <Generator
          propsRef={(el: any) => ($engines.current[0] = el)}
          setInitHeight={setInitHeight}
        />
      ),
    },
    {
      title: '번역',
      contents: (
        <Translator
          propsRef={(el: any) => ($engines.current[1] = el)}
          setInitHeight={setInitHeight}
        />
      ),
    },
    {
      title: 'G# 1',
      contents: (
        <Guide
          title="Guide 1. 실 활용 예제"
          type={1}
          propsRef={(el: any) => ($engines.current[2] = el)}
          setInitHeight={setInitHeight}
        />
      ),
    },
    {
      title: 'G# 2',
      contents: (
        <Guide
          title="Guide 2. 관련 예시"
          type={2}
          propsRef={(el: any) => ($engines.current[3] = el)}
          setInitHeight={setInitHeight}
        />
      ),
    },
    {
      title: 'Tword',
      contents: (
        <Tword
          propsRef={(el: any) => ($engines.current[4] = el)}
          setInitHeight={setInitHeight}
          tword={tword}
        />
      ),
    },
  ];

  useEffect(() => {
    setInitHeight();

    const engineBoxY = $engineBox.current.getBoundingClientRect().top;

    const scrollEngineBox = (event: any) => {
      setInitHeight();

      for (let i = 0; i < $engines.current.length; i++) {
        const $engine = $engines.current[i];
        const engineY = $engine.getBoundingClientRect().top - engineBoxY;
        const engineHeight = $engine.clientHeight;

        if (engineY > -(engineHeight - 10)) {
          setCntEngine(i);
          return;
        }
      }
    };

    $engineBox.current.addEventListener('scroll', scrollEngineBox);

    // return () =>
    //   $engineBox.current.removeEventListener('scroll', scrollEngineBox);
  }, []);

  return (
    <Container size={size}>
      <EngineList>
        {engineList.map((engine, i) => (
          <EngineBtn
            key={`engineTitle${i}`}
            current={i === cntEngine}
            onClick={() => onClick(i)}
          >
            {engine.title}
          </EngineBtn>
        ))}
      </EngineList>
      <EditContainer>
        <Confirm />
        <EngineBox ref={$engineBox}>
          {engineList.map((engine, i) => (
            <React.Fragment key={`engine${i}`}>
              {engine.contents}
            </React.Fragment>
          ))}
        </EngineBox>
      </EditContainer>
    </Container>
  );
}

export default Editor;
