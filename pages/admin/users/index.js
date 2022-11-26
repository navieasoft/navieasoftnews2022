import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import useStore from "../../../components/context/useStore";

const AllUser = () => {
  const [showupdateUser, setShowUpdateUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(0);
  const [uid, setUid] = useState("");
  const updatedRole = useRef(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/user?page=${page}&filter=${filter}`);
        if (res.ok) {
          const result = await res.json();
          const filtered = result.filter(
            (user) => user.email !== store?.user.email
          );
          setUsers(filtered);
        } else throw { message: "There was an error" };
      } catch (error) {
        store.setAlert({ message: error.message, type: "error" });
        store.setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, page, filter]);

  async function updateUser(id, value) {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("user_role", value);
    formData.append("user_id", store?.user.id);
    try {
      const res = await fetch(`/api/user`, {
        method: "PUT",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      setShowUpdateUser(false);
      store.setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      store.setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  async function deleteUser(id) {
    const confirm = window.confirm("Are you sure to delete the user?");
    if (confirm) {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_id", store?.user.id);
      try {
        const res = await fetch(`/api/user?id=${id}`, {
          method: "DELETE",
          body: formData,
        });
        const result = await res.json();
        if (!res.ok) throw { message: result.message };
        store.setAlert({ msg: result.message, type: "success" });
        setUpdate((prev) => !prev);
      } catch (error) {
        store.setAlert({ msg: error.message, type: "error" });
      }
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div
        className='alluser-container'
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Emain</th>
              <th>Designation</th>
              <th>
                <select
                  onChange={(e) => setFilter(e.target.value)}
                  className='text-gray-700'
                >
                  <option value=''>filter</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {users && users.length ? (
              users.map((item) => (
                <tr
                  onClick={() => {
                    setShowUpdateUser(false);
                  }}
                  key={item.id}
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.user_role}</td>
                  <td onClick={(e) => e.stopPropagation()} className='relative'>
                    <div className='space-x-3'>
                      <button
                        disabled={loading}
                        className='text-yellow-500'
                        onClick={() => {
                          setUid(item.id);
                          setShowUpdateUser(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => deleteUser(item.id)}
                        disabled={loading}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className='btn-group flex justify-end my-3 pr-4 w-full'>
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
            className='btn'
          >
            «
          </button>
          <button className='btn'>Page 1</button>
          <button onClick={() => setPage((prev) => prev + 1)} className='btn'>
            »
          </button>
        </div>
        <div
          className={`update-user-container ${
            showupdateUser ? "block" : "hidden"
          }`}
        >
          <h3>Change user Designation</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(uid, updatedRole.current?.value);
            }}
          >
            <select required ref={updatedRole}>
              <option value=''>select</option>
              <option value='user'>user</option>
              <option value='admin'>admin</option>
            </select>
            <div className='mt-5 flex justify-center'>
              <button disabled={loading} className='btn btn-primary'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllUser;
