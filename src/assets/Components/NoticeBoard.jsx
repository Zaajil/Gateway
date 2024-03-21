const NoticeBoard = () => {
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
            animation: scrollAnimation 10s linear infinite;
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
          <div className="p-10 scrolling-content">
            <ul className="list-disc">
              <li>
                1.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Cumque pariatur ut dolorem, modi similique, est expedita
                doloremque, omnis soluta error commodi impedit temporibus?
                Aperiam, laborum? Quae sit ab aspernatur numquam.
              </li>
              <li>
                2.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Cumque pariatur ut dolorem, modi similique, est expedita
                doloremque, omnis soluta error commodi impedit temporibus?
                Aperiam, laborum? Quae sit ab aspernatur numquam.
              </li>
              <li>
                3.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Cumque pariatur ut dolorem, modi similique, est expedita
                doloremque, omnis soluta error commodi impedit temporibus?
                Aperiam, laborum? Quae sit ab aspernatur numquam.
              </li>
            </ul>
          </div>
          {/* Clone the content to create a seamless loop */}
          <div className="p-10 scrolling-content">
            <ul className="list-disc">
              <li>
                1.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Cumque pariatur ut dolorem, modi similique, est expedita
                doloremque, omnis soluta error commodi impedit temporibus?
                Aperiam, laborum? Quae sit ab aspernatur numquam.
              </li>
              <li>
                2.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Cumque pariatur ut dolorem, modi similique, est expedita
                doloremque, omnis soluta error commodi impedit temporibus?
                Aperiam, laborum? Quae sit ab aspernatur numquam.
              </li>
              <li>
                3.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Cumque pariatur ut dolorem, modi similique, est expedita
                doloremque, omnis soluta error commodi impedit temporibus?
                Aperiam, laborum? Quae sit ab aspernatur numquam.
              </li>
            </ul>
          </div>
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
