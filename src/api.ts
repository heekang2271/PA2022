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
  const data = [
    'We also introduce Wikidata5M, a new large-scale KG dataset, which shall promote the research on large-scale KG, inductive KE, and the interactions between KG and NLP.',
    'We also introduce Wikidata5M, a new large-scale KG dataset, which shall promote the research on large-scale KG, inductive KE, and the interactions between KG and NLP.',
  ];

  return data;
}

export async function fetchTranslator(input: string) {
  const data =
    'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.';

  return data;
}

export async function fetchGuide1(input: string) {
  const data = [
    'We also introduce Wikidata5M, a new large-scale KG dataset, which shall promote the research on large-scale KG, inductive KE, and the interactions between KG and NLP.',
    'We also introduce Wikidata5M, a new large-scale KG dataset, which shall promote the research on large-scale KG, inductive KE, and the interactions between KG and NLP.',
  ];

  return data;
}

export async function fetchGuide2(input: string) {
  const data = [
    'We also introduce Wikidata5M, a new large-scale KG dataset, which shall promote the research on large-scale KG, inductive KE, and the interactions between KG and NLP.',
    'We also introduce Wikidata5M, a new large-scale KG dataset, which shall promote the research on large-scale KG, inductive KE, and the interactions between KG and NLP.',
  ];

  return data;
}
