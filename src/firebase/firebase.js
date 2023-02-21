// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "react-coder-lgm.firebaseapp.com",
  projectId: "react-coder-lgm",
  storageBucket: "react-coder-lgm.appspot.com",
  messagingSenderId: "433780924976",
  appId: "1:433780924976:web:234da603b63c77215ac3f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(); //Querying DB

//Product CRUD
export const getProducts = async () => {
  const books = await getDocs(collection(db, "books"));
  const booksArray = books.docs.map((book) => {
    return { ...book.data(), id: book.id };
  });
  return booksArray;
};

export const getProductById = async (id) => {
  const book = await getDoc(doc(db, "books", id));
  const bookObject = { ...book.data(), id: book.id };
  return bookObject;
};

export const getProductByName = async (name) => {
  const citiesRef = collection(db, "books");
  const parsedName = name.split("-")[0];
  const capitalizedName =
    parsedName.charAt(0).toUpperCase() + parsedName.slice(1);
  const q = query(citiesRef, where("itemName", "==", capitalizedName));
  const querySnapshot = await getDocs(q);
  let result;
  querySnapshot.forEach((doc) => {
    console.dir(doc.data());
    result = doc.data();
  });
  return result;
};

/**
 * Seeds the firestorage
 */
export const seedDB = async () => {
  const booksFetch = await fetch("../json/books.json");
  const books = await booksFetch.json();
  books.forEach(async (book) => {
    await addDoc(collection(db, "books"), { ...book });
  });
};
