import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "./firebase";

export async function handleLogin(email, password, store, setError) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (user && user.emailVerified) {
      store?.setUser(user);
      store?.setAlert({ msg: "Login successful", type: "success" });
      store?.setShowLoginRegister(false);
    } else if (!user.emailVerified) {
      store?.setAlert({
        msg: "Your email is not varified",
        type: "error",
      });
    }
  } catch (error) {
    setError(error.message);
  }
}

export async function handleRegister(email, password, name, store, setError) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (user) {
      await sentVarifyEmail(user, store, setError);
      await updateProfile(user, {
        displayName: name,
      });
    } else {
      store?.setAlert({
        msg: "Somthing went wrong!, Try again",
        type: "error",
      });
    }
  } catch (error) {
    setError(error.message);
    console.log(error.message);
  }
}

export async function googleLogin(setError, store) {
  try {
    setError("");
    const { user } = await signInWithPopup(auth, googleProvider);
    if (user) {
      store?.setUser(user);
      store?.setAlert({ msg: "Login successful", type: "success" });
      store?.setShowLoginRegister(false);
    } else {
      store?.setAlert({
        msg: "Somthing went wrong!, Try again",
        type: "error",
      });
    }
  } catch (error) {
    setError(error.message);
  }
}

export async function facebookLogin(setError, store) {
  try {
    setError("");
    const { user } = await signInWithPopup(auth, facebookProvider);
    if (user) {
      store?.setUser(user);
      store?.setAlert({ msg: "Login successful", type: "success" });
      store?.setShowLoginRegister(false);
    } else {
      store?.setAlert({
        msg: "Somthing went wrong!, Try again",
        type: "error",
      });
    }
  } catch (error) {
    setError(error.message);
  }
}

export async function passwordResetEmail(email, store, setError) {
  try {
    await sendPasswordResetEmail(auth, email);
    store?.setAlert({
      msg: "A password reset email sent to your email",
      type: "success",
    });
  } catch (error) {
    setError(error.message);
  }
}

async function sentVarifyEmail(user, store, setError) {
  try {
    await sendEmailVerification(user, {
      url: "http://localhost:3000/",
    });
    store?.setAlert({
      msg: "An varification email sent to your email",
      type: "success",
    });
  } catch (error) {
    setError(error.message);
  }
}
