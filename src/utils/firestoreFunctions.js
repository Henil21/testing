import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import app from "../app/firebase/config";

// Initialize Firestore
const db = getFirestore(app);

// Fetch all posts
export async function getPosts() {
  console.log("firestoreFunctions loaded");
  const postsCol = collection(db, "posts");
  const postsSnapshot = await getDocs(postsCol);
  const postsList = postsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate(),  // Convert timestamp to Date object
  }));
  return postsList;
}

// Add a new post
export async function addNewPost(postData) {
  const postsCol = collection(db, "posts");
  const newPost = await addDoc(postsCol, postData);  // postData should contain title, content, and timestamp
  return newPost;
}

// Delete a post
export async function deletePost(postId) {
  const postRef = doc(db, "posts", postId);
  await deleteDoc(postRef);
}

// Function to get a post by ID
export const getPostById = async (postId) => {
  const postDoc = doc(db, 'posts', postId);
  const docSnap = await getDoc(postDoc);  // Fetch document using getDoc
  if (docSnap.exists()) {
      return { id: postId, ...docSnap.data() };  // Return post data if exists
  } else {
      throw new Error('Post not found');
  }
};

// Edit post function
export const editPost = async (postId, updatedPost) => {
  const postDoc = doc(db, 'posts', postId);
  await updateDoc(postDoc, updatedPost);
};

