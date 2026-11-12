export interface BookgraphMetadata {
  id: string;
  doc_id: string;
  level: number;
  heading_path: string[];
  page_start: number | null;
  page_end: number | null;
  prev_id: string | null;
  next_id: string | null;
  block_ids: string[];
}

export interface ReaderSection {
  title: string;
  description?: string;
  bookgraph: BookgraphMetadata;
  body: string;
}

export interface OutlineNode {
  id: string;
  title: string;
  level: number;
  parent_id: string | null;
  child_ids: string[];
}

export interface ReaderOutline {
  doc_id: string;
  nodes: OutlineNode[];
}
