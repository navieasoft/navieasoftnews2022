import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import useStore from "../../../components/context/useStore";

const Siteinfo = () => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({
    name: "",
    logo: "",
    favicon: "",
  });
  const store = useStore();
  const existedInfo = store?.siteInfo;

  function handleChange(e) {
    const name = e.target.name;
    if (name !== "name") {
      setInfo((prev) => {
        return { ...prev, [name]: e.target.files[0] };
      });
    } else {
      setInfo((prev) => {
        return { ...prev, [name]: e.target.value };
      });
    }
  }
  useEffect(() => {
    if (info.name || info.logo || info.favicon) {
      setLoading(false);
    } else setLoading(true);
  }, [info]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", store?.user.uid);
    if (info.name) formData.append("name", info.name);
    if (info.logo) {
      formData.append("logo", info.logo);
      formData.append("existedLogo", existedInfo?.logo);
    } else {
      formData.append("logo", existedInfo?.logo);
    }
    if (info.favicon) formData.append("favicon", info.favicon);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      store.setUpdate((prev) => !prev);
      store?.setAlert({ msg: result.message, type: "success" });
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  return (
    <AdminLayout>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='site-info-container'
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <div className='item'>
          <p>Site name</p>
          <input
            className='font-medium'
            name='name'
            onChange={(e) => handleChange(e)}
            type='text'
            placeholder='Type here...'
          />
        </div>
        <div className='item'>
          <p>Logo of your site</p>
          <input
            type='file'
            accept='image/*'
            name='logo'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='item'>
          <p>Favicon of your site</p>
          <input
            type='file'
            name='favicon'
            accept='image/*'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='col-span-3 flex justify-end'>
          <button disabled={loading} className='btn btn-primary'>
            Save Changes
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Siteinfo;
