const converter = new showdown.Converter();
const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const autoCompleteTags = {
  help: '<a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Acesse o site oficial para ver algumas tags do Markdown aqui</a>',
  h1: '<h1></h1>',
  h2: '<h2></h2>',
  h3: '<h3></h3>',
  h4: '<h4></h4>',
  h5: '<h5></h5>',
  h6: '<h6></h6>',
  p: '<p></p>',
  strong: '<strong></strong>',
  em: '<em></em>',
  li: '<li></li>',
  hr: '<hr>',
  ul: '<ul>\n<li></li>\n</ul>',
  ol: '<ol>\n<li></li>\n</ol>',
  code: '<code></code>',
  blockquote: '<blockquote></blockquote>',
  a: '<a href=""></a>',
  img: '<img src="" alt="" target="_blank">',
};
const insertTag = (tag) => {
  const cursorPosition = markdownInput.selectionStart;
  const textBeforeCursor = markdownInput.value.slice(0, cursorPosition);
  const textAfterCursor = markdownInput.value.slice(cursorPosition);
  const lastWord = textBeforeCursor.trim().split(' ').pop();
  const newTag = autoCompleteTags[tag];
  const updatedText =
    textBeforeCursor.replace(lastWord, newTag) + textAfterCursor;
  markdownInput.value = updatedText;
  markdownInput.setSelectionRange(
    cursorPosition + newTag.length - lastWord.length,
    cursorPosition + newTag.length - lastWord.length
  );
  const markdownText = markdownInput.value;
  const htmlText = converter.makeHtml(markdownText);
  preview.innerHTML = htmlText;
};
markdownInput.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    const cursorPosition = markdownInput.selectionStart;
    const textBeforeCursor = markdownInput.value.slice(0, cursorPosition);
    const textAfterCursor = markdownInput.value.slice(cursorPosition);
    const lastWord = textBeforeCursor.trim().split(' ').pop();
    const tag = autoCompleteTags[lastWord];
    if (tag) {
      insertTag(lastWord);
    }
  }
});
markdownInput.addEventListener('input', () => {
  const markdownText = markdownInput.value;
  const htmlText = converter.makeHtml(markdownText);
  preview.innerHTML = htmlText;
});

const textAreas = document.querySelectorAll('textarea');

textAreas.forEach((textArea) => {
  textArea.addEventListener('keyup', (e) => {
    textArea.style.height = 'auto';

    let scrollHeight = e.target.scrollHeight;
    textArea.style.height = `${scrollHeight}px`;
  });
});
