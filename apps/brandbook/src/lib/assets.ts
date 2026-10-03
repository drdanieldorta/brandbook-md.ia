/** Caminho público de um ativo de marca, respeitando a base do GitHub Pages. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
}

export const STORYBOOK_URL = asset('storybook/');
export const REPO_URL = 'https://github.com/drdanieldorta/brandbook-md.ia';
