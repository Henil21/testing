'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPostById, editPost } from '../../../utils/firestoreFunctions';
import { auth, db } from '../../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import styles from './EditPost.module.css'; // Import CSS module

const EditPost = () => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [post, setPost] = useState({ title: '', content: '' });
    const router = useRouter();
    const { id } = useParams();  // Get post ID from route

    const handleUpdatePost = async () => {
        try {
            await editPost(id, post);  // Update post with current data
            router.push('/dashboard');  // Redirect back to dashboard
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const loadPost = async () => {
        const fetchedPost = await getPostById(id);  // Fetch post data by ID
        setPost(fetchedPost);
    };

    useEffect(() => {
        const checkAdminRole = async (user) => {
            const userDoc = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDoc);
            if (docSnap.exists()) {
                const role = docSnap.data().role;
                if (role === 'admin') {
                    setIsAdmin(true);
                    loadPost();  // Load post data
                } else {
                    router.push('/login');  // Redirect non-admin users to login
                }
            } else {
                router.push('/login');
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                checkAdminRole(user);
            } else {
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id, router]);

    if (loading) return <p className={styles.loading}>Loading...</p>;

    if (!isAdmin) return null;

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Edit Post</h1>
            <input
                type="text"
                placeholder="Title"
                value={post.title}
                className={styles.inputField}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <textarea
                placeholder="Content"
                value={post.content}
                className={styles.textArea}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
            <button className={styles.button} onClick={handleUpdatePost}>
                Update Post
            </button>
        </div>
    );
};

export default EditPost;
