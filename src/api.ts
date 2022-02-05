async function fetchData(url: string) {
  return fetch(url).then((response) => response.json());
}

export async function fetchBERTPaper(id: string) {
  const data = [
    {
      title: 'Title',
      chapters: [
        {
          title: '',
          contents: '',
        },
      ],
    },
    {
      title: 'Abstract',
      chapters: [
        {
          title: 'Introduction',
          contents: '',
        },
        {
          title: 'Method',
          contents: '',
        },
        {
          title: 'Results',
          contents: '',
        },
        {
          title: 'Conclusion',
          contents: '',
        },
      ],
    },
    {
      title: 'Introduction',
      chapters: [
        {
          title: 'Introduction',
          contents: '',
        },
        {
          title: 'Method',
          contents: '',
        },
        {
          title: 'Results',
          contents: '',
        },
        {
          title: 'Conclusion',
          contents: '',
        },
      ],
    },
  ];

  return data;
}

export async function fetchGenerator(input: string) {
  if (input === 'Recently, in the field of natural language processing,') {
    const data = [
      'Recently, in the field of natural language processing, the BERT model using a transformer shows excellent performance.',
      'Recently, in the field of natural language processing, the BERT model released by Google in various fields such as machine translation, question answering, and object name recognition is showing excellent performance.',
    ];

    return data;
  }

  return [];
}

export async function fetchTranslator(input: string) {
  if (
    input ===
    '최근 기계번역 질의응답 개체명 인식 등 인간의 언어정보 처리 분야에서 수요가 높아지는 자연어 처리 기술(NLP)중 년 구글 이 공개한 양방향 트랜스포머 버트2018 (Google)(Transformer BERT, Bidirectional Encoder Representations from Transformers) 모델은 우수한 성능을 발휘한다'
  ) {
    const data =
      'Among the natural language processing technologies (NLPs) that are recently in demand in the field of human language information processing such as machine translation, question answering, object name recognition, and the like, the interactive Transformer BERT 2018 (Google) (Transformer BERT, Bidirectional Encoder Representations from Transformers) model unveiled by Google is Excellent performance';

    return data;
  }

  return '';
}

export async function fetchGuide1(input: string) {
  if (
    input ===
    'Transformer is a model from a paper published by Google and is implemented only with attention.'
  ) {
    const data = [
      {
        value:
          'Recently, a new simple architecture, the TRANSFORMER (Vaswani et al., 2017), that based solely on attention mechanisms has attracted increasing attention in machine translation community.',
        doi: 'Yang, Baosong, et al. "Modeling localness for self-attention networks." arXiv preprint arXiv:1810.10182 (2018).',
      },
      {
        value:
          'Most recently, the Transformer model (Vaswani et al., 2017), which is based solely on a selfattention mechanism (Parikh et al., 2016) and feed-forward connections, has further advanced the field of NMT, both in terms of translation quality and speed of convergence.',
        doi: 'Chen, Mia Xu, et al. "The best of both worlds: Combining recent advances in neural machine translation." arXiv preprint arXiv:1804.09849 (2018',
      },
    ];

    return data;
  }

  return [];
}

export async function fetchGuide2(input: string) {
  if (
    input ===
    'Recently, Natural language processing studies using the BERT model announced by Google are showing excellent performance.'
  ) {
    const data = [
      {
        value: 'Recent years have witnessed a growing academic interest in ...',
        doi: 'Academic Phrasebank',
      },
      {
        value: 'Transformer is a central concept in ...',
        doi: 'Academic Phrasebank',
      },
    ];

    return data;
  }

  return [];
}
