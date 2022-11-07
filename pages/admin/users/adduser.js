import { uploadImageToFirebase } from "../../../services/client/firebase";
import useStore from "../../../components/context/useStore";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import React, { useState } from "react";
import Footer from "../../../components/admin/common/Footer";
import AdminLayout from "../../../components/admin/AdminLayout";

const Adduser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const store = useStore();

  function handleChange(e) {
    const name = e.target.name;
    if (e.target.type !== "file") {
      setUser((prev) => {
        return { ...prev, [name]: e.target.value };
      });
    } else {
      setUser((prev) => {
        return { ...prev, [name]: e.target.files[0] };
      });
    }
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const peyload = user;
      peyload.userId = store?.user.uid;
      // upload image
      if (peyload.photoURL) {
        if (peyload.photoURL.size > 500000) {
          throw { message: "Image size too long, give less than 500kb" };
        } else {
          const { error, url } = await uploadImageToFirebase(peyload.photoURL);
          if (error) {
            throw { message: "Error ocured when images uploading" };
          } else {
            peyload.photoURL = url;
          }
        }
      }
      //post data;
      const res = await fetch("http://localhost:3000/api/user", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(peyload),
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      store?.setAlert({ msg: result.message, type: "success" });
    } catch (error) {
      console.log(error);
      store?.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className='add-user-container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <h3>Add a user</h3>
          <input
            onChange={(e) => handleChange(e)}
            name='displayName'
            type='text'
            required
            placeholder='Enter the user name'
          />
          <input
            onChange={(e) => handleChange(e)}
            name='email'
            required
            type='email'
            placeholder='Enter the user email'
          />
          <input
            onChange={(e) => handleChange(e)}
            name='password'
            required
            type='password'
            placeholder='Give a password'
          />
          <select onChange={(e) => handleChange(e)} name='designation' required>
            <option value=''>Give a role</option>
            <option value='admin'>admin</option>
            <option value='editor'>editor</option>
          </select>
          <input
            onChange={(e) => handleChange(e)}
            className='w-full'
            name='photoURL'
            type='file'
          />
          <button disabled={loading} className='btn btn-primary'>
            Add
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Adduser;
