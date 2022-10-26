import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";

const AllUser = () => {
  const data = [
    { name: "iqbal", email: "iqbal@gmail.com", designation: "admin" },
    { name: "kader", email: "kader@gmail.com", designation: "user" },
    { name: "Ahmed", email: "ahmed@gmail.com", designation: "editor" },
  ];

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
                  <select className='text-gray-700'>
                    <option value=''>filter</option>
                    <option value='admin'>Admin</option>
                    <option value='editor'>Editor</option>
                    <option value='user'>User</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.designation}</td>
                  <td className='space-x-2 relative'>
                    <button
                      onClick={() =>
                        router.push("/admin/news/updatenews?id=id")
                      }
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete("id")}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
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
        </div>
      </div>
    </div>
  );
};

export default AllUser;
