import {
  faEdit,
  faEllipsisVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import useStore from "../../../components/context/useStore";

const AllUser = () => {
  const [showupdateUser, setShowUpdateUser] = useState(false);
  const [showControl, setShowControl] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const { setError, setAlert } = useStore();
  const [users, setUsers] = useState(null);
  const [uid, setUid] = useState("");
  const updatedRole = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user", { signal });
        const result = await res.json();
        setUsers(result);
      } catch (error) {
        setError(true);
      }
    })();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  // async function filterUser(value) {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/api/user?designation=${value}`
  //     );
  //     const result = await res.json();
  //     console.log(result);
  //   } catch (error) {
  //     setError(true);
  //   }
  // }

  async function updateUser(uid, title, value) {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/user?title=${title}`, {
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          uid,
          [title]: value,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      setAlert({ msg: result.message, type: "success" });
      setUpdate((prev) => !prev);
    } catch (error) {
      setAlert({ msg: error.message, type: "error" });
    }
    setLoading(false);
  }

  async function deleteUser(uid) {
    const confirm = window.confirm("Are you sure to delete the user?");
    if (confirm) {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/user?uid=${uid}`, {
          method: "DELETE",
        });
        const result = await res.json();
        if (!res.ok) throw { message: result.message };
        setAlert({ msg: result.message, type: "success" });
        setUpdate((prev) => !prev);
      } catch (error) {
        setAlert({ msg: error.message, type: "error" });
      }
      setLoading(false);
    }
  }

  return (
    <div className='bg-gray-50'>
      <Header />
      <div className='flex gap-5 overflow-auto'>
        <SideBar />
        <div className='alluser-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Emain</th>
                <th>Designation</th>
                <th>
                  <select
                    // onChange={(e) => filterUser(e.target.value)}
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
                    <td
                      onClick={(e) => e.stopPropagation()}
                      className='relative'
                    >
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
          <div className='btn-group flex justify-end my-3 mx-4'>
            <button className='btn'>«</button>
            <button className='btn'>Page 1</button>
            <button className='btn'>»</button>
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
      </div>
    </div>
  );
};

export default AllUser;
