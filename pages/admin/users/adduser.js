import useStore from "../../../components/context/useStore";
import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { useForm } from "react-hook-form";

const Adduser = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const store = useStore();

  const onSubmit = async (data) => {
    try {
      data.user_id = store.user.id;
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      setLoading(true);
      data.user_id = store?.user.id;
      //post data;
      const res = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      reset();
      store?.setAlert({ msg: result.message, type: "success" });
    } catch (error) {
      store?.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className='add-user-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Add a user</h3>
          <input
            {...register("name", { required: true })}
            type='text'
            required
            placeholder='Enter the user name'
          />
          <input
            {...register("email", { required: true })}
            required
            type='email'
            placeholder='Enter the user email'
          />
          <input
            {...register("password", { required: true })}
            required
            type='password'
            placeholder='Give a password'
          />
          <select {...register("user_role", { required: true })} required>
            <option value=''>Give a role</option>
            <option value='admin'>admin</option>
            <option value='user'>user</option>
          </select>
          <button disabled={loading} className='btn btn-primary'>
            Add
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Adduser;
