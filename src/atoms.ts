import { atom, selector } from 'recoil';

export enum BERTPaperMinWidth {
  'paper' = 300,
  'chapter' = 300,
  'editor' = 300,
}

export const isDarkState = atom({
  key: 'isDark',
  default: false,
});

export const userState = atom({
  key: 'user',
  default: {
    userId: '123',
  },
});

export const docWidthState = atom({
  key: 'docWidth',
  default: document.body.clientWidth,
});

interface IBERTPaper {
  title: string;
  chapters: {
    title: string;
    contents: string;
  }[];
}

export const BERTPaperState = atom<IBERTPaper[]>({
  key: 'BERTPaper',
  default: [],
});

interface IChapter {
  group: string;
  chapter: string;
}

export const chapterState = atom<IChapter>({
  key: 'chapter',
  default: {
    group: '',
    chapter: '',
  },
});

export const editState = atom({
  key: 'edit',
  default: '',
});

export const engineState = atom({
  key: 'engine',
  default: 0,
});

export const BERTPaperWidthState = atom({
  key: 'BERTPaperSize',
  default: {
    paper: 0.5,
    chapter: 0.5,
    editor: 0,
  },
});

export const BERTPaperWidthSelector = selector({
  key: 'BERTPaperSizeSelector',
  get: ({ get }) => {
    const BERTPaperWidthRatio = get(BERTPaperWidthState);
    const docWidth = get(docWidthState);

    return {
      paper:
        BERTPaperWidthRatio.paper * docWidth > BERTPaperMinWidth.paper
          ? BERTPaperWidthRatio.paper * docWidth
          : BERTPaperMinWidth.paper,
      chapter:
        BERTPaperWidthRatio.chapter * docWidth > BERTPaperMinWidth.chapter
          ? BERTPaperWidthRatio.chapter * docWidth
          : BERTPaperMinWidth.chapter,
      editor:
        BERTPaperWidthRatio.editor * docWidth > BERTPaperMinWidth.editor
          ? BERTPaperWidthRatio.editor * docWidth
          : BERTPaperMinWidth.editor,
    };
    // return {
    //   paper: BERTPaperWidthRatio.paper * docWidth,
    //   chapter: BERTPaperWidthRatio.chapter * docWidth,
    //   editor: BERTPaperWidthRatio.editor * docWidth,
    // };
  },
});
