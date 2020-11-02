import {
  writeXML,
  getXML,
  fetchPage,
  getLinks,
  search,
  clean,
} from './utils.ts';

const baseUrl = 'http://odm-budgetaire.org/composants/normes';
const text = await fetchPage(baseUrl);

const elements = getLinks(text);

const years = elements
  .map(e => e.attributes.href)
  .filter(href => href !== '../' && href.endsWith('/'))
  .map(clean);

for await (const year of years) {
  const paths = (await search(baseUrl, year)).flat(Infinity) as string[];

  paths.forEach(async path => {
    const xml = await getXML(baseUrl, path);

    writeXML(path, xml);
  });

  console.log(year, 'done');
  console.log(paths);
}
