export function convertToBase62(id: number){
  const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  while(id > 0){
    result = base62[id % 62] + result;
    id = Math.floor(id / 62);
  }
  return result;
}

