import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
// 根据 astro.config.mjs 中的 `base` 选项进行更改。
// 它们应该匹配。默认值为"/"。
const base = '/';
app.use(base, express.static('dist/client/'));
app.use(ssrHandler);

app.listen(8080, () => {
  console.log('server start in 8080...')
});