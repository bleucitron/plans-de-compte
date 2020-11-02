import { fetchPage, getLinks, search, clean } from './utils.ts';

const baseUrl = 'http://odm-budgetaire.org/composants/normes';
const text = await fetchPage(baseUrl);

const elements = getLinks(text);

const years = elements
  .map(e => e.attributes.href)
  .filter(href => href !== '../' && href.endsWith('/'))
  .map(clean);

for await (const year of years) {
  const files = (await search(baseUrl, year)).flat(Infinity);
  console.log(year, 'done');
  console.log(files);
}
