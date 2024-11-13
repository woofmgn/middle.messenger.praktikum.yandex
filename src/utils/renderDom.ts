// utils/renderDOM.js

import { Block } from './Block';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`Селектор ${query} не найден, произошла ошибка.`);
  }

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
