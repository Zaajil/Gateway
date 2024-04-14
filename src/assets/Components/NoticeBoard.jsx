import { useState, useEffect } from "react";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch("https://gateway.pythonanywhere.com/notices/notice/");
        if (!response.ok) {
          throw new Error("Failed to fetch notice board data");
        }
        const data = await response.json();
        setNotices(data.notices); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching notice board data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="flex justify-evenly mt-20 relative z-[-10]">
      <style>
        {`
          .scrolling-container {
            position: relative;
            height: 400px; /* Adjust the height as needed */
            overflow: hidden;
          }

          .scrolling-content {
            display: flex;
            flex-direction: column;
            animation: scrollAnimation 20s linear infinite; /* Adjust speed here */
          }

          @keyframes scrollAnimation {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-100%);
            }
          }
        `}
      </style>
      <div className="bg-gray-100 border-2 border-black w-[400px] h-[400px] relative overflow-hidden">
        <h1 className="text-[24px] pt-8 text-center border-b-[2px] border-black bg-gray-100 sticky top-0 z-10">
          Notice Board
        </h1>
        <div className="scrolling-container">
          {notices.map((notice, index) => (
            <div key={index} className="p-10 scrolling-content">
              <p>{notice.content}</p>
            </div>
          ))}
        </div>
      </div>
      <img
        src="./landing_img_2.png"
        alt=""
        className="w-[472px] object-cover rounded-[20px]"
      />
    </div>
  );
};

export default NoticeBoard;
