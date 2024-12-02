// "use client";

// import { useEffect, useState } from "react";
// import { getPosts } from "../../utils/firestoreFunctions";

// const BlogPage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const data = await getPosts();
//       setPosts(data);
//     };
    
//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h1>Blog Posts</h1>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//             <p>{new Date(post.timestamp).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//       <h1>Blog ends</h1>
//     </div>
//   );
// };

// export default BlogPage;




"use client";

import { useEffect, useState } from "react";
import { getPosts } from "../../utils/firestoreFunctions";
import styles from "./blog.module.css"; // For styling
import { useRouter } from "next/navigation";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleCardClick = (postId) => {
    router.push(`/blog/${postId}`); // Navigate to the specific post page
  };

  return (
    <div className={styles.container}>
      {/* <h1 style={ "font-style: normal; font-weight: 400; font-size: 16px; line-height: 24px; color: #ffffff;"}>Blogs</h1> */}
      <h1 style={{ fontStyle: 'normal', fontWeight: 400, lineHeight: '24px', color: '#ffffff' }}>
  Blogs
</h1>
<br></br><br></br>

      <div className={styles.cardContainer}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={styles.card}
            onClick={() => handleCardClick(post.id)} // Handle click
          >
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p> {/* Display preview */}
            <p>{new Date(post.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
