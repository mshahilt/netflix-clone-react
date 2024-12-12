import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import {firebaseConfig} from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
        toast.success("Signup successful!");
    } catch (error) {
        const errMsg = error.message.toString().match(/\(([^)]+)\)/)?.[1]?.split('/')[1];
        toast.error(errMsg.split('-').join(' ') || "Signup failed!");
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!");
    } catch (error) {
        const errMsg = error.message.toString().match(/\(([^)]+)\)/)?.[1]?.split('/')[1];
        toast.error(errMsg.split('-').join(' ')|| "Login failed!");
    }
};

const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Logout successful!");
    } catch (error) {
        console.error("Error during Firebase logout:", error.message);
        toast.error(error.message || "Logout failed!");
    }
};

export { auth, db, login, signup, logout };
