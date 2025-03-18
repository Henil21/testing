"use client";
import Head from "next/head";
import UserCard from "../components/chatUserCard/UserCard";
import styles from "./chatbox.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { updateCredits } from "../redux/slices/authSlice";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import ChatOptionButton from "../components/chatOptionButton/ChatOptionButton";



const demoUserName = [
  {
    id: 1,
    userName: "Chat Bot",
    tagMessage: "",
  },
  {
    id: 2,
    userName: "Report Generator",
    tagMessage: "",
  },
  {
    id: 3,
    userName: "Image Analysis",
    tagMessage: "",
  },
  //... other users
];

const ChatBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState(demoUserName[1]);
  const messageListRef = useRef(null);
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null); // Create a ref for the file input field
  const dropdownContent = document.getElementById('dropdownContent');
  const [DropUp,setDropUp] = useState(false);

  const toggleDropUp = ()=>{
    setDropUp(!DropUp);
  }

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
  const authToken = useSelector((state) => state.auth.token); // Get the auth token from Redux
  // const flaskBackendUrl = ;
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const fetchGeminiResponse = async (message, token) => {
    try {
      const response = await fetch(
        `https://gateway-server.agreeablepebble-91c72eda.southindia.azurecontainerapps.io/chat/?message=${message}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include Bearer token
          },
          body: JSON.stringify({ message }), // Send user message to Flask
        }
      );

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
  const handleUploadImage = async (image, query, token) => {
    const formData = new FormData();
    formData.append("image", image); // Append the image file
    // formData.append("text_query", query); // Append the query

    try {
      // Make the POST request to the backend API
      const response = await axios.post(
        `https://gateway-server.agreeablepebble-91c72eda.southindia.azurecontainerapps.io/chat/image-analysis?text_query=${query}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the authentication token
            "Content-Type": "multipart/form-data", // Set the Content-Type to multipart/form-data
          },
        }
      );

      // Return the response data if successful
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.detail || "Failed to analyze image");
      }
    } catch (error) {
      // Handle and return error details
      console.error("Error uploading image:", error.message);
      return { error: error.message };
    }
  };
  const handleGenerateReport = async (query) => {
    if (!query.trim()) {
      alert("Please enter a query for the report.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://gateway-server.agreeablepebble-91c72eda.southindia.azurecontainerapps.io/chat/report`,
        null,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          params: { message: query },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      // console.log(url)
      // Append the PDF file as a downloadable link
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Here is your generated report:",
          sender: "chatbot",
          isFormatted: false,
          isReport: true,
          reportUrl: url,
        },
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
        sender: "user",
        file: selectedFile ? selectedFile.name : null, // Add file name if selected
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");

      if (selectedUser.id === 1) {
        const geminiResponse = await fetchGeminiResponse(inputValue);
        const formattedResponse = formatChatbotResponse(geminiResponse);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: formattedResponse || "Sorry, no response was received.",
            sender: "chatbot",
            isFormatted: true,
          },
        ]);
      } else if (selectedUser.id === 2) {
        await handleGenerateReport(inputValue);
      } else if (selectedUser.id === 3) {
        if (!selectedFile) {
          alert("Please upload an image.");
          return;
        }

        if (!inputValue.trim()) {
          alert("Please enter a query.");
          return;
        }

        setLoading(true);

        const response = await handleUploadImage(
          selectedFile,
          inputValue,
          authToken
        );

        if (response.error) {
          alert(response.error);
        } else {
          const formate = formatChatbotResponse(response.response);
          // console.log(formate)
          setMessages((prevMessages) => [
            ...prevMessages,
            // { text: "Image analysis result:", sender: "chatbot", isFormatted: false },
            { text: formate, sender: "chatbot", isFormatted: true },
          ]);
          updateCredits(response.credits_remaining);
        }

        setLoading(false);
        setSelectedFile(null); // Reset the selected file
        setInputValue(""); // Clear the query
        fileInputRef.current.value = ""; // Reset the file input field manually
      }
    }
  };

  const scrollToBottom = () => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  };

  const toggleSideBar = () => setIsSideBarOpen((pre) => !pre);
  const handleUserSwitch = (user) => {
    setSelectedUser(user);
    setMessages([]); // Clear chat messages on user switch
  };
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
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected image file
  };
  const handleFileButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click manually
  };

  // if(loading){
  //   return (
  //     <div className={styles.loading}>
  //       <h2 className={styles.loadingHeading}>Generating Report...</h2>
  //     </div>
  //   );
  // }
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
          {/* <aside className={styles.userAsideBar}>
            <div className={styles.sideBarToggleBtn} onClick={toggleSideBar}>
              <GoSidebarCollapse size={28} color="#666" />
            </div>
            <div className={styles.users}>
              {demoUserName.length === 0 ? (
                <p className={styles.noUserMessage}>No user</p>
              ) : (
                demoUserName?.map((user, index) => (
                  <div
                    key={index}
                    className={`${styles.userCard} ${
                      selectedUser.id === user.id ? styles.activeUser : ""
                    }`}
                    onClick={() => handleUserSwitch(user)}
                  >
                    <UserCard data={user} />
                  </div>
                ))
              )}
            </div>
          </aside> */}
          <div className={styles.chatBox}>
            {/* <div
              className={
                isSideBarOpen
                  ? styles.sideBarToggleBtn
                  : `${styles.sideBarToggleBtn} ${styles.showSideBar}`
              }
              onClick={toggleSideBar}
            >
              <GoSidebarExpand size={28} color="#666" />
            </div> */}
            <div className={styles.messageList} ref={messageListRef}>
              {messages.length === 0 ? (
                <div className={styles.emptyChat}>
                  {selectedUser.id === 1 ? (
                    <>
                      No Chat Yet
                      <br />
                      <span className={styles.emptyChatText}>
                        Example: <em>What to do if I got cancer?</em>
                      </span>
                    </>
                  ) : selectedUser.id === 3 ? (
                    <>
                      No Image Analyzed Yet
                      <br />
                      <span className={styles.emptyChatText}>
                        Example:{" "}
                        <em>
                          Send an image with the query: "What does this X-ray
                          indicate?"
                        </em>
                      </span>
                    </>
                  ) : (
                    <>
                      No Reports Generated Yet
                      <br />
                      <span className={styles.emptyChatText}>
                        Example: <em>Generate a report for Cancer Stage 2</em>
                      </span>
                    </>
                  )}
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
                      ) : message.file ? (
                        <>
                          <p>{message.text}</p>
                          <p className={styles.fileName}>
                            📎 File Attached: {message.file}
                          </p>
                        </>
                      ) : message.isReport ? (
                        <>
                          <div className={styles.message}>
                            <p>{message.text}</p>
                            <div className={styles.fileIconWrapper}>
                              <img
                                src="/pdf.png" // Replace with the path to your file icon
                                alt="Download File"
                                className={styles.fileIcon}
                                onClick={() => {
                                  const link = document.createElement("a");
                                  link.href = message.reportUrl; // Use the report URL
                                  link.setAttribute(
                                    "download",
                                    "axamine-ai_research_Report.pdf"
                                  ); // Default filename
                                  document.body.appendChild(link);
                                  link.click();
                                  link.remove();
                                }}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        message.text
                      )}
                      <div className={styles.messageIndicator}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className={styles.inputANDbutton}>
              <form onSubmit={handleSubmit} className={styles.inputForm}>
                {/* <button type="button" className={styles.sendButton}>
                <img src="./chatBoxFileBtn.png" alt="sendButton" />
              </button> */}
                {selectedUser.id === 3 && (
                  <div className={styles.fileInput}>
                    {/* Trigger the file input click using a button */}
                    <button
                      type="button"
                      className={styles.sendButton}
                      onClick={handleFileButtonClick}
                    >
                      {selectedFile ? (
                        <span className={styles.fileSelected}>
                          <img src="./chatBoxFileBtn.png" alt="fileSelected" />{" "}
                          {/* Icon indicating a file is selected */}
                          {/*                         <span className="text text-white">1 </span> */}
                          <img
                            src="./file_968097.png"
                            alt="fileUploaded"
                            className={styles.fileUploadedIcon}
                          />
                        </span>
                      ) : (
                        <img src="./chatBoxFileBtn.png" alt="sendButton" />
                      )}
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef} // Attach the ref to the input field
                      style={{ display: "none" }} // Hide the actual file input
                    />
                  </div>
                )}

                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={
                    loading
                      ? "Please Wait While we generate your report..."
                      : selectedUser.id === 1
                      ? "Example: What to do if I got cancer?"
                      : selectedUser.id === 3
                      ? "Example: Send an image with the query: What does this X-ray indicate?"
                      : "Example: Generate a report for Cancer Stage 2"
                  }
                  className={styles.inputField}
                  required
                  disabled={loading}
                />

                {loading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    {/* <span class="sr-only">Loading...</span> */}
                  </div>
                )}

                {!loading && (
                  <button type="submit" className={styles.sendButton}>
                    <img src="./sendBtn.png" alt="sendButton" />
                  </button>
                )}
              </form>
              <div className={styles.inputChatbuttonContainer}>
                <div className={styles.inputChatbuttonHolder}>
                {demoUserName.map((user, index) => {
                  return (
                    <button
                      className={styles.inputChatbutton}
                      key={index}
                      onClick={() => handleUserSwitch(user)}
                    >
                      {user.userName}
                    </button>
                  );
                })}</div>
                <div class={styles.dropup}>
                  <button  class={styles.dropbtn} onClick={toggleDropUp}>Select</button>
                  <div class={styles.dropupContent }    style={{
    // display: DropUp ? 'block' : 'none',
    opacity: DropUp ? 1 : 0,

    
  }} id="dropdownContent">
                <div className={styles.inputChatbuttonHolderMd} style={{display:DropUp?'block':'none'}}>
                {demoUserName.map((user, index) => {
                  return (
                    <button
                      className={styles.inputChatbuttonMd}
                      key={index}
                      onClick={() => {handleUserSwitch(user);
                        toggleDropUp();
                      }}
                      
                    >
                      {user.userName}
                    </button>
                  );
                })}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChatBox;
