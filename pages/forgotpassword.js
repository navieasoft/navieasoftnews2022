import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Forgotpassword = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [disable, setDisable] = useState(false);
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.query.token) {
        const res = await fetch(
          `/api/login?varifypasswordToken=${router.query.token}`
        );
        const result = await res.json();
        if (res.ok) {
          setSuccess(result);
        } else setSuccess(null);
      }
      // else router.push("/");
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  async function onSubmit(data) {
    if (data.password !== data.repassword) {
      return alert("Check your carefully");
    } else delete data.repassword;
    setDisable(true);
    data.id = success.id;
    data.email = success.email;
    try {
      const res = await fetch("/api/login?updateuser=true", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        localStorage.setItem("token", result.token);
        router.push("/");
      } else throw result;
    } catch (error) {
      alert(error.message);
    }
    setDisable(false);
  }

  if (loading)
    return (
      <div className='password-page-loading'>
        <p>Loading...</p>
      </div>
    );
  return (
    <div>
      {success ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='forgot-password-form'
        >
          <input
            {...register("password", { required: true })}
            type='password'
            placeholder='Enter your password'
          />
          <input
            {...register("repassword", { required: true })}
            type='password'
            placeholder='Confirm the password'
          />
          <div className='flex justify-center'>
            <button disabled={disable} className='btn btn-primary active'>
              Change password
            </button>
          </div>
        </form>
      ) : (
        <div className='expired-link'>
          <p>The Link is expired</p>
        </div>
      )}
    </div>
  );
};

export default Forgotpassword;
