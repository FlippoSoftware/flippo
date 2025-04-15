import { URLSearchParams } from 'node:url';

export async function getFile(token, file_key, options) {
  const query = JSON.parse(JSON.stringify(new URLSearchParams(options)));

  return fetch(`https://api.figma.com/v1/files/${file_key}?${query.toString()}`, {
    headers: {
      'X-FIGMA-TOKEN': token
    }
  }).then((res) => res.json());
}
