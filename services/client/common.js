export async function axios(url, options) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url, options);
    const result = await res.json();
    if (!res.ok) reject({ message: result.message });
    resolve(result);
  });
}
