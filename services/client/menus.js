export const category = [
  {
    name: "World",
    subs: [
      "Asia",
      "Europe",
      "Noth Amerika",
      "South Amerika",
      "Afrika",
      "Australia",
    ],
  },
  {
    name: "US",
    subs: ["Alaska", "Arizona", "Arkansas", "California", "Colorado"],
  },
  { name: "Politics", subs: ["International", "Bangladesh"] },
  { name: "N.Y" },
  { name: "Business" },
  { name: "Tech" },
  { name: "Science" },
  { name: "Health" },
  { name: "Sports" },
  { name: "Arts" },
  { name: "Books" },
  { name: "Style" },
  { name: "Food" },
  { name: "Travel" },
  { name: "Magazine", subs: ["Science", "Technology", "Story", "History"] },
  { name: "Real EState" },
];

export async function handleAddCategory(name, store) {
  try {
    const res = await fetch("https://newsportal-tau.vercel.app/api/menus", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const result = await res.json();
    if (!res.ok) throw { message: result.message };
    store?.setAlert({ msg: result.message, type: "success" });
  } catch (error) {
    store?.setAlert({ msg: error.message, type: "error" });
  }
}

export async function handleEditCategory(value, store, categoryId) {
  try {
    const res = await fetch("https://newsportal-tau.vercel.app/api/menus", {
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ value, categoryId }),
    });
    const result = await res.json();
    if (!res.ok) throw { message: result.message };
    store?.setAlert({ msg: result.message, type: "success" });
  } catch (error) {
    store?.setAlert({ msg: error.message, type: "error" });
  }
}

export async function handleDeleteCategory(id, store, setUpdate) {
  const confirm = window.confirm("Are you sure to delete?");
  if (confirm) {
    try {
      const res = await fetch("https://newsportal-tau.vercel.app/api/menus", {
        headers: {
          "content-type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      else {
        store?.setAlert({ msg: result.message, type: "success" });
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
  }
}

export async function handleAddSub(value, store, categoryId) {
  try {
    const res = await fetch(
      "https://newsportal-tau.vercel.app/api/menus/subcategory",
      {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ value, categoryId }),
      }
    );
    const result = await res.json();
    if (!res.ok) throw { message: result.message };
    store?.setAlert({ msg: result.message, type: "success" });
  } catch (error) {
    store?.setAlert({ msg: error.message, type: "error" });
  }
}

export async function handleDeleteSub(categoryId, value, store, setUpdate) {
  const confirm = window.confirm("Are you sure to delete?");
  if (confirm) {
    try {
      const res = await fetch(
        "https://newsportal-tau.vercel.app/api/menus/subcategory",
        {
          headers: {
            "content-type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify({ categoryId, value }),
        }
      );
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      else {
        store?.setAlert({ msg: result.message, type: "success" });
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
  }
}
