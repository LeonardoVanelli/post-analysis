import axios from 'axios';

const cookie = process.env.INSTAGRAM_COOKIE;

const accounts = new Map([
  [
    'nubank',
    { code: '1495428601', max_id_default: '3165654662506850612_1495428601' },
  ],
  [
    'c6bank',
    { code: '7312423938', max_id_default: '3171629731665761811_3092024585' },
  ],
  [
    'interbr',
    { code: '3092024585', max_id_default: '3171629731665761811_3092024585' },
  ],
]);

const headers = {
  authority: 'www.instagram.com',
  accept: '*/*',
  'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  cookie,
  dpr: '1.1',
  referer: 'https://www.instagram.com/c6bank/',
  'sec-ch-prefers-color-scheme': 'light',
  'sec-ch-ua':
    '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
  'sec-ch-ua-full-version-list':
    '"Not/A)Brand";v="99.0.0.0", "Google Chrome";v="115.0.5790.171", "Chromium";v="115.0.5790.171"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-ch-ua-platform-version': '"10.0.0"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'viewport-width': '1745',
  'x-asbd-id': '129477',
  'x-csrftoken': 'S20UluXlfsdBMvwh9thEiMYwOw3WSWRO',
  'x-ig-app-id': '936619743392459',
  'x-ig-www-claim': 'hmac.AR1LYrRYequvYTXxPXY66IhLKrwRvH0EdH0PmgsRzAnVNPgR',
  'x-requested-with': 'XMLHttpRequest',
};

async function getPosts(maxId: string | null, count: number, account: string) {
  const accountCode = accounts.get(account);

  if (!accountCode) {
    throw new Error('Account not suported');
  }

  const posts = await axios.get(
    `https://www.instagram.com/api/v1/feed/user/${accountCode.code}`,
    {
      params: {
        max_id: maxId ?? accountCode.max_id_default,
        count,
      },
      headers: headers,
    }
  );
  return posts.data;
}

export { getPosts };
