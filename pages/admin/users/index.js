import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Footer from "../../../components/admin/common/Footer";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import useStore from "../../../components/context/useStore";

const AllUser = () => {
  const [showupdateUser, setShowUpdateUser] = useState(false);
  const [showControl, setShowControl] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [uid, setUid] = useState("");
  const updatedRole = useRef(null);
  const store = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch(`/api/user?page=${page.toString()}`, {
          signal,
        });
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

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, page]);

  async function filterUser(value) {
    store.setLoading(true);
    try {
      const res = await fetch(`/api/user?page=${page.toString()}`);
      if (res.ok) {
        const result = await res.json();
        if (value) {
          const filtered = result?.filter(
            (item) => (item.customClaims?.designation || "user") === value
          );
          setUsers(filtered);
        } else setUsers(result);
      } else throw { message: "There was an error" };
    } catch (error) {
      store.setAlert({ message: error.message, type: "error" });
      store.setError(true);
    }
    store.setLoading(false);
  }

  async function updateUser(uid, title, value) {
    setLoading(true);
    try {
      const res = await fetch(`/api/user?title=${title}`, {
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          uid,
          [title]: value,
          userId: store?.user.uid,
        }),
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

  async function deleteUser(uid) {
    const confirm = window.confirm("Are you sure to delete the user?");
    if (confirm) {
      setLoading(true);
      try {
        const res = await fetch(`/api/user?uid=${uid}`, {
          headers: {
            "content-type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify({ userId: store?.user.uid }),
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
                  onChange={(e) => filterUser(e.target.value)}
                  className='text-gray-700'
                >
                  <option value=''>filter</option>
                  <option value='admin'>Admin</option>
                  <option value='editor'>Editor</option>
                  <option value='user'>User</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length &&
              users.map((item, i) => (
                <tr
                  onClick={() => {
                    setShowControl(-1);
                    setShowUpdateUser(false);
                  }}
                  key={item.uid}
                >
                  <td>{item.displayName}</td>
                  <td>{item.email}</td>
                  <td>{item.customClaims?.designation || "user"}</td>
                  <td onClick={(e) => e.stopPropagation()} className='relative'>
                    <button className='w-5' onClick={() => setShowControl(i)}>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    <div
                      className={`control-wrapper ${
                        showControl === i ? "block" : "hidden"
                      }`}
                    >
                      <button
                        onClick={() => deleteUser(item.uid)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                      <button
                        disabled={loading}
                        onClick={() =>
                          updateUser(
                            item.uid,
                            `${item.disabled ? "Enable" : "Disable"}`,
                            true
                          )
                        }
                      >
                        {item.disabled ? "Enable" : "Disable"}
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setUid(item.uid);
                          setShowUpdateUser(true);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className='btn-group flex justify-end my-3 pr-4 w-full'>
          <button
            disabled={page === 1}
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
              updateUser(uid, "designation", updatedRole.current?.value);
            }}
          >
            <select required ref={updatedRole}>
              <option value=''>select</option>
              <option value='user'>user</option>
              <option value='admin'>admin</option>
              <option value='editor'>editor</option>
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
