import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUdolk641v_wLoeLdRIgCNIZe8DyYS2hk",
  authDomain: "blog-highlight.firebaseapp.com",
  databaseURL: "https://blog-highlight.firebaseio.com",
  projectId: "blog-highlight",
  storageBucket: "blog-highlight.appspot.com",
  messagingSenderId: "622355798468",
  appId: "1:622355798468:web:ad211cb348247859222c91",
  measurementId: "G-H8EJQ97RLW"
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
};
