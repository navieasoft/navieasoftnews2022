export async function axios(url, options) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url, options);
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
