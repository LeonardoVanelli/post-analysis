import axios from 'axios';

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
  cookie:
    'ig_did=3BE2DD80-51CC-49BD-AD2A-BBE356BF5A97; mid=ZJiE5QALAAFR0uSO1K_llfdAkAVZ; fbm_124024574287414=base_domain=.instagram.com; datr=I37dZFuH6b2Sk0u6-i_x5oI5; ig_nrcb=1; csrftoken=Hw4L320QiRN2eWXtXakHevhSUBlE3m0c; ds_user_id=1819526494; dpr=1.100000023841858; shbid="15161\\0541819526494\\0541724195047:01f73070d774179c1e55ddf6c6a91e6f0d2426aafb1ea21a005fbcac85c08ee4d797be64"; shbts="1692659047\\0541819526494\\0541724195047:01f73618029d2d1b60cf0f3a394fb99518464ff420babcab9d9bde4abec2fdb971309b71"; fbsr_124024574287414=2JA-tGXWP6v_mKMT1tdMt3-mdkxQqZvhLr_3PKNNe-4.eyJ1c2VyX2lkIjoiMTAwMDAzMjM5MjkwNzQ5IiwiY29kZSI6IkFRQ3QzVFVTd24zWFBkUGU1VVVJbDZ5S3lQZC0wQk1OZWhPTUhDemYtUEtkVVRaR3ludjBZdlVZdkdacnpINDJvVXVsNmEtbTBuNWxFY0gyckN3MDVUd0hNc1RGOEJpOEtYaWJLcF84Z1hTS1N1Vktrc2w3X3kyNGktc2FsRGFFbUpQYlBQSThnRGlfNWJ1TnhKcEkweEhTZ0hZckhLSndYc0xNcUFkbnNRUHA3M1BhVk9BV0tEQjY3NTFFelRtb1RldjkyNEs4VThpak1XMEJnZFF1VU84M0pkSlJCR0V2Yy13YVFrMktNM0VUSDZYdmoySzl5T0xlVzRqcTQ1SnB4NDI0UXdmLWVTT1c3Um9EV1hfWHphZGpoQnNrVkhvdUtid0VNTlRLMlY4aXMtNWxhbVRlZU50WUVDOWRkNDNIRjF0SDljSVVUT1U1M0RVSmlPZFBvTWFDVnA0bE50X2RUTjB0N0lCb3hhQWpLQSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQk93VUJyelpBZ0l6MDlZMXozNmNaQjI5WkIwNjNJdTBOYW1YVWd5b1pDZXpVWkNrTHgxUG9lZVgycDJnRnZzY1hncFpDQlhGemFBeW1KRjE2NWpGcTM2eGlYRExUdVpBNFQwU2paQ1VlTWtYMldvczNSblF3TXF3UEQ5Q2hCanM1cmFWSllSaDhZRkwzeWxmWEphd0w5VnlBR0lPbnE2MVBpSndQWTJDMGdvYW1UZWlYUklUcGJ3VmxYUlFaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjkyNjU5MDQ4fQ; sessionid=1819526494%3AjKaeNir0actb4d%3A4%3AAYf8HX1prd4lYiVLlWDcZSGszJHQWYnJVXV9vm6rgA; rur="EAG\\0541819526494\\0541724195052:01f710dc456fbb2b5c8103cb7080bffb63a37eeaff4c540549186a9e159dd6835fe55aae"',
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
