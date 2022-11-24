export async function postImage(file, exist) {
  try {
    const formData = new FormData();
    formData.append("img", file);
    if (exist) formData.append("exist", exist);

    const res = await fetch("/api", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    if (res.ok) {
      console.log(result);
      return { image: result.image, error: false };
    } else throw { message: result.message };
  } catch (error) {
    return { image: null, error: error.message };
  }
}
