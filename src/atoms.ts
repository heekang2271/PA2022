import { atom, selector } from 'recoil';

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

    // return {
    //   paper:
    //     BERTPaperWidthRatio.paper * docWidth > 300
    //       ? BERTPaperWidthRatio.paper * docWidth
    //       : 300,
    //   chapter:
    //     BERTPaperWidthRatio.chapter * docWidth > 300
    //       ? BERTPaperWidthRatio.chapter * docWidth
    //       : 300,
    //   editor:
    //     BERTPaperWidthRatio.editor * docWidth > 300
    //       ? BERTPaperWidthRatio.editor
    //       : 300,
    // };
    return {
      paper: BERTPaperWidthRatio.paper * docWidth,
      chapter: BERTPaperWidthRatio.chapter * docWidth,
      editor: BERTPaperWidthRatio.editor * docWidth,
    };
  },
});
