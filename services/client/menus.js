import { axios } from "./common";

export async function handleAddCategory(name, store) {
  try {
    const result = await axios("/api/menus", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, userId: store?.user?.uid }),
    });
    store?.setAlert({ msg: result.message, type: "success" });
  } catch (error) {
    store?.setAlert({ msg: error.message, type: "error" });
  }
}

export async function handleEditCategory(name, store, id) {
  try {
    const result = await axios("/api/menus", {
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ name, id, userId: store?.user?.uid }),
    });
    store?.setAlert({ msg: result.message, type: "success" });
  } catch (error) {
    console.log(error);
    store?.setAlert({ msg: error.message, type: "error" });
  }
}

export async function handleDeleteCategory(id, store, setUpdate) {
  const confirm = window.confirm("Are you sure to delete?");
  if (confirm) {
    try {
      const result = await axios("/api/menus", {
        headers: {
          "content-type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ id, userId: store?.user?.uid }),
      });
      store?.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
  }
}

export async function handleAddSub(name, store, category_id) {
  try {
    const result = await axios("/api/menus/subcategory", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, category_id, userId: store?.user?.uid }),
    });
    store?.setAlert({ msg: result.message, type: "success" });
  } catch (error) {
    store?.setAlert({ msg: error.message, type: "error" });
  }
}

export async function handleDeleteSub(id, store, setUpdate) {
  const confirm = window.confirm("Are you sure to delete?");
  if (confirm) {
    try {
      const result = await axios("/api/menus/subcategory", {
        headers: {
          "content-type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ id, userId: store?.user?.uid }),
      });
      store?.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
  }
}
