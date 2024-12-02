"use client";
import Head from "next/head";
import UserCard from "../components/chatUserCard/UserCard";
import styles from "./chatbox.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import store from "../redux/store";
import { updateCredits } from "../redux/slices/authSlice";

const demoUserName = [
  {
    id: 1,
    userName: "Axamine Ai",
    tagMessage: "Our company needs to prepare",
  }
  //... other users
];

const ChatBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const messageListRef = useRef(null);
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/signin?redirect=/chatbox`);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatChatbotResponse = (rawText) => {
    let formattedText = rawText
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text for headings
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text for emphasis
      .replace(/- /g, "<li>") // Bullet points with <li>
      .replace(/\n/g, "<br/>"); // Line breaks for newlines

    formattedText = formattedText.replace(
      /<li>(.*?)<\/li>/g,
      "<ul><li>$1</li></ul>"
    );

    return formattedText;
  };
  const token = store.getState().auth.token;
  // const flaskBackendUrl = ;
  const dispatch = useDispatch();
  const fetchGeminiResponse = async (message, token) => {
    try {
      const response = await fetch(`https://api.axamine.ignitionnestlabs.in/chat/?message=${message}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
        body: JSON.stringify({ message }), // Send user message to Flask
      });
  
      if (response.ok) {
        const data = await response.json();
        dispatch(updateCredits({ credits: data.credits_remaining }));
        return data.response; // Get the response from Flask backend
      } else {
        throw new Error("Error fetching response from Flask backend");
      }
    } catch (error) {
      console.error(error);
      return "Sorry, I couldn't get a response. Please try again.";
    }
  };
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const newMessage = { text: inputValue, sender: "user" };

      // Append the user's message to the message list
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInputValue(""); // Clear the input field after sending the message

      // Get response from Flask backend (which calls Gemini API)
      const geminiResponse = await fetchGeminiResponse(inputValue,token);

      // Format the response from the chatbot
      const formattedResponse = formatChatbotResponse(geminiResponse);

      // Append only the chatbot's response to the message list
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: formattedResponse || "Sorry, no response was received.",
          sender: "chatbot",
          isFormatted: true,
        },
      ]);
    }
  };

  const scrollToBottom = () => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  };

  const toggleSideBar = () => setIsSideBarOpen((pre) => !pre);

  // Prevent render if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.loginErrMessage}>
        <h2 className={styles.loginErrorHeading}>
          Please login to access this page...
        </h2>
      </div>
    ); // Don't render anything if user is not authenticated
  }

  return (
    <>
      <Head>
        <title>Axamine - ChatBox</title>
        <meta
          name="description"
          content="Chat with Axamine's AI-integrated diagnostic system."
        />
        <meta
          name="keywords"
          content="Axamine, AI, Diagnostic, Chat, Healthcare, Technology"
        />
        <link rel="canonical" href="https://www.axamine.in/chatbox" />
      </Head>
      <div className={styles.main}>
        <section
          id="chatbox"
          className={isSideBarOpen ? styles.sideBarOpen : styles.sideBarClose}
        >
          <aside className={styles.userAsideBar}>
            <div className={styles.sideBarToggleBtn} onClick={toggleSideBar}>
              <img src="./sideBarCloseBtn.png" alt="sideBarImage" />
            </div>
            <div className={styles.users}>
              {demoUserName.length === 0 ? (
                <p className={styles.noUserMessage}>No user</p>
              ) : (
                demoUserName?.map((user, index) => (
                  <UserCard key={index} data={user} />
                ))
              )}
            </div>
          </aside>
          <div className={styles.chatBox}>
            <div
              className={
                isSideBarOpen
                  ? styles.sideBarToggleBtn
                  : `${styles.sideBarToggleBtn} ${styles.showSideBar}`
              }
              onClick={toggleSideBar}
            >
              <img src="./sideBarOpenBtn.png" alt="sideBarImage" />
            </div>
            <div className={styles.messageList} ref={messageListRef}>
              {messages.length === 0 ? (
                <div className={styles.emptyChat}>
                  {/* <img
                    // src="./empty-chat.png"
                    // alt="Empty Chat"
                    className={styles.emptyChatImage}
                  /> */}
                  <p className={styles.emptyChatText}>No messages yet</p>
                </div>
              ) : (
                messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`${styles.messageContainer} ${
                      message.sender === "user"
                        ? styles.userMessage
                        : styles.chatbotMessage
                    }`}
                  >
                    <img
                      src={
                        message.sender === "user"
                          ? "./userIcon.png"
                          : "./chatbot.png"
                      }
                      alt={`${message.sender} Icon`}
                      className={styles.messageIcon}
                    />
                    <div className={styles.message}>
                      {message.isFormatted ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: message.text }}
                        ></div> // Render formatted response
                      ) : (
                        message.text
                      )}
                      <div className={styles.messageIndicator}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <button type="button" className={styles.sendButton}>
                <img src="./chatBoxFileBtn.png" alt="sendButton" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className={styles.inputField}
                required
              />
              <button type="submit" className={styles.sendButton}>
                <img src="./sendBtn.png" alt="sendButton" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChatBox;
