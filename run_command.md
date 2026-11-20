cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph
uv run --extra mcp bookgraph mcp /path/to/workspace
uv run --extra mcp bookgraph mcp ./workspace



cd /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev

read -rsp "OpenAI API key: " OPENAI_API_KEY; echo
export OPENAI_API_KEY

pnpm --filter book-reader dev



cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph
export BOOKGRAPH_TRANSLATION_API_KEY='sk-4170396c796da6a5299e94a5d58201639767d17b47839837ef273ac7817da0c2'

uv run --extra http bookgraph serve-http \
  /home/trinh-quoc-bau/Documents/Book_reader/workspace


claude --resume d6b1158c-ce57-4cf7-aef3-078b1a95a17e
