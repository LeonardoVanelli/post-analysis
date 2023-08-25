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
    'ig_did=3BE2DD80-51CC-49BD-AD2A-BBE356BF5A97; mid=ZJiE5QALAAFR0uSO1K_llfdAkAVZ; fbm_124024574287414=base_domain=.instagram.com; datr=I37dZFuH6b2Sk0u6-i_x5oI5; ig_nrcb=1; ds_user_id=1819526494; dpr=1.100000023841858; csrftoken=F8zwWeVSxxyxxEoVgBf4yBOYcwKtELde; fbsr_124024574287414=WU-LlKpi2g53syb7fgjD-RiA7mwrun85-lZSov_lE50.eyJ1c2VyX2lkIjoiMTAwMDAzMjM5MjkwNzQ5IiwiY29kZSI6IkFRQjVRdkc2aF9seGJwN3dZNjRUbTRpbjlRZ1F2TVhvWURLNXJpRVZ2bDJvdkF6VW1WcEk2dldYT2REeTNxN3pjRkN4VmlBU2dmWWRUNVA5c1FYWmktQXFQOElXbDBOb2EwNDN0NGZqNE83Njg4bkFuLTdUVW1waFotc1Q3dGpubkdoLU5fTklHNG5jZWFrQ2NXUnpXVmotSlBheHIwTFFKdDNWcnBXT0R1QUlDWTNfYndLbHBRVlJXU0xyZ3ZGQTRBRXQ1OEVXZWt5dFF0ZWQ2d3lxQ1hNSFVJbEtZd0EtdnJSOVliY3VWWEx3M3RfR3hsaVZPQTJLcy1kXzlLN09aQXZmaERRU3Q0QkFlM0dOeXBjQy1GbjktU0ZoVVZPa0M3WkpGXzhRaWJmdFU5TkdldTgydVJQZll5TEt4NDhPbXRIbFkxRTZ1VkpLTV8wNzVYZGlEQWZjUHBxTnhRSTZPZl9SOXI4WURLcldDQSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQk95VnM1OHRyZmx6eFJ5WE1EZGdJYlhXQmVYVEtaQ2xpdEY5NWVYaXdxdWxKWkNaQkRkeUt4bW1vUG54WkFQRFdCcnZHcEhpNzg1ZkxhWkJQVkQ1R05GdEp4bXBaQ0ZaQ1RrQ3JRUjdMU2kxZ24zaUhYZmtvYWIxUzFzaGJmbEpkUXFIZU1aQVRUeTVqNDNaQWhNMTFhRFhaQ1pBbUdKUUc4aFlFZFpBR3N6MzJGSGVDWkN2WXRBYkM2WkNsVGpVRmtaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjkyOTIwMTc4fQ; shbid="15161\\0541819526494\\0541724456194:01f7a4b4f3fbb2ebde86a66c6143c6aedea29eab3490003b6ce6038c8841bd24a075810d"; shbts="1692920194\\0541819526494\\0541724456194:01f7dd35da497f31da9246a2815e69de7eb29693d9a8629f0593aa61c8a5e7d4c8a4cce6"; sessionid=1819526494%3Ah37smcRufA1n8Q%3A27%3AAYdKLqixXixUXgREvr52BJ_A9090qJjMpikjLQ2n-Q; fbsr_124024574287414=WU-LlKpi2g53syb7fgjD-RiA7mwrun85-lZSov_lE50.eyJ1c2VyX2lkIjoiMTAwMDAzMjM5MjkwNzQ5IiwiY29kZSI6IkFRQjVRdkc2aF9seGJwN3dZNjRUbTRpbjlRZ1F2TVhvWURLNXJpRVZ2bDJvdkF6VW1WcEk2dldYT2REeTNxN3pjRkN4VmlBU2dmWWRUNVA5c1FYWmktQXFQOElXbDBOb2EwNDN0NGZqNE83Njg4bkFuLTdUVW1waFotc1Q3dGpubkdoLU5fTklHNG5jZWFrQ2NXUnpXVmotSlBheHIwTFFKdDNWcnBXT0R1QUlDWTNfYndLbHBRVlJXU0xyZ3ZGQTRBRXQ1OEVXZWt5dFF0ZWQ2d3lxQ1hNSFVJbEtZd0EtdnJSOVliY3VWWEx3M3RfR3hsaVZPQTJLcy1kXzlLN09aQXZmaERRU3Q0QkFlM0dOeXBjQy1GbjktU0ZoVVZPa0M3WkpGXzhRaWJmdFU5TkdldTgydVJQZll5TEt4NDhPbXRIbFkxRTZ1VkpLTV8wNzVYZGlEQWZjUHBxTnhRSTZPZl9SOXI4WURLcldDQSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQk95VnM1OHRyZmx6eFJ5WE1EZGdJYlhXQmVYVEtaQ2xpdEY5NWVYaXdxdWxKWkNaQkRkeUt4bW1vUG54WkFQRFdCcnZHcEhpNzg1ZkxhWkJQVkQ1R05GdEp4bXBaQ0ZaQ1RrQ3JRUjdMU2kxZ24zaUhYZmtvYWIxUzFzaGJmbEpkUXFIZU1aQVRUeTVqNDNaQWhNMTFhRFhaQ1pBbUdKUUc4aFlFZFpBR3N6MzJGSGVDWkN2WXRBYkM2WkNsVGpVRmtaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjkyOTIwMTc4fQ; rur="NCG\\0541819526494\\0541724456241:01f733807130a89f14ac392760cdf91c6f841264a49c5f07d9e1e699a2c0a2f47b9ca25c"',
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
