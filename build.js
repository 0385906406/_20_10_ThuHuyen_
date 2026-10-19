// Đóng gói index.html (dạng Artifact, không có <head>/<body>) thành trang web đầy đủ trong thư mục deploy/ để đưa lên Vercel.
// Chạy: node build.js
const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, 'deploy');
fs.mkdirSync(out, { recursive: true });

const page = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const head = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0a1a38">
<meta name="description" content="Một bầu trời nhỏ, dành riêng cho Thu Huyền. Chúc mừng 20/10 💙">
<meta property="og:title" content="Gửi Thu Huyền 💙">
<meta property="og:description" content="Một bầu trời nhỏ, dành riêng cho em. Chúc mừng 20/10.">
<meta property="og:type" content="website">
<style>[hidden]{display:none!important}</style>
</head>
<body>
`;
fs.writeFileSync(path.join(out, 'index.html'), head + page + '\n</body>\n</html>\n');
fs.copyFileSync(path.join(__dirname, 'nhac.mp3'), path.join(out, 'nhac.mp3'));
const photos = path.join(__dirname, 'anh');
if (fs.existsSync(photos)) {
  fs.mkdirSync(path.join(out, 'anh'), { recursive: true });
  for (const f of fs.readdirSync(photos)) fs.copyFileSync(path.join(photos, f), path.join(out, 'anh', f));
}
const models = path.join(__dirname, 'models');
if (fs.existsSync(models)) {
  fs.mkdirSync(path.join(out, 'models'), { recursive: true });
  for (const f of fs.readdirSync(models)) fs.copyFileSync(path.join(models, f), path.join(out, 'models', f));
}
console.log('Đã đóng gói vào', out);
