const botKeywords = [
  'bot',
  'crawl',
  'spider',
  'googlebot',
  'bingbot',
  'yahoo',
  'baidu',
  'yandex',
  'msnbot',
  'duckduckbot',
  'facebookexternalhit',
];

export function isBot(userAgent: string): boolean {
  const lowercaseUserAgent = userAgent.toLowerCase();
  return botKeywords.some((keyword) => lowercaseUserAgent.includes(keyword));
}
