export type ReadingBook = {
  id: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  coverClass: string;
  readerHref: string;
};

const signalsReaderHref = "?doc=tin-hieu-he-thong&section=1-5-decision-theory";

export const currentlyReading: ReadingBook[] = [
  { id: "signals", title: "Signals and Systems", author: "Alan V. Oppenheim", currentPage: 184, totalPages: 694, coverClass: "signal", readerHref: signalsReaderHref },
  { id: "thinking", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", currentPage: 92, totalPages: 499, coverClass: "thinking", readerHref: signalsReaderHref },
  { id: "invisible", title: "Invisible Cities", author: "Italo Calvino", currentPage: 141, totalPages: 176, coverClass: "invisible", readerHref: signalsReaderHref },
  { id: "cosmos", title: "Cosmos", author: "Carl Sagan", currentPage: 67, totalPages: 396, coverClass: "cosmos", readerHref: signalsReaderHref },
];
