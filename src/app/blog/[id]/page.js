"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPostById } from "../../../utils/firestoreFunctions"; // Adjust the import path if necessary
import styles from "./blogPost.module.css"; // Import the CSS module

const BlogPost = ({ params }) => {
  const { id } = params; // Extract post ID from URL
  const [post, setPost] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostById(id);
        
        // Convert Firestore timestamp to JS Date if it exists
        if (postData.timestamp && postData.timestamp.toDate) {
          postData.timestamp = postData.timestamp.toDate(); // Convert Firestore Timestamp to JS Date
        }

        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <p>Loading post...</p>; // Display loading state
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.timestamp}>
        {post.timestamp ? post.timestamp.toLocaleString() : 'No Date Available'}
      </p>
      <div className={styles.content}>{post.content}</div>
      <button className={styles.backButton} onClick={() => router.back()}>
        Go Back
      </button>
    </div>
  );
};

export default BlogPost;
