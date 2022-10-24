import React from "react";
import Header from "../../components/admin/common/header";
import SideBar from "../../components/admin/common/SideBar";

const Admin = () => {
  return (
    <section className='dashboard-container'>
      <Header />
      <main className='flex gap-5'>
        <SideBar />
        <div>deshboard</div>
      </main>
    </section>
  );
};

export default Admin;
