import {
  DOMParser,
  Element,
} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

const { mkdir, writeTextFile } = Deno;

export function clean(s: string) {
  return s.replace('/', '');
}

export function getLinks(content: string) {
  const parsed = new DOMParser().parseFromString(content, 'text/html');
  const links = parsed?.querySelectorAll('a') || [];

  return [...links] as Element[];
}

export async function fetchPage(url: string) {
  const resp = await fetch(url);
  const text = await resp.text();

  return text;
}

export async function search(
  baseUrl: string,
  ...folders: string[]
): Promise<any> {
  const url = [baseUrl, ...folders].join('/');

  const content = await fetchPage(url);
  const links = getLinks(content).map(e => e.attributes.href);

  if (links.includes('planDeCompte.xml')) {
    const xml = await fetchPage(
      [baseUrl, ...folders, 'planDeCompte.xml'].join('/'),
    );

    const file = folders.pop();
    const path = folders.join('/');
    await mkdir(path, { recursive: true });

    const name = [path, file].join('/') + '.xml';
    await writeTextFile(name, xml);
    return name;
  } else {
    return Promise.all(
      links
        .filter(href => href !== '../' && href.endsWith('/'))
        .map(clean)
        .map(async link => await search(baseUrl, ...folders, link))
        .flat(Infinity),
    );
  }
}
