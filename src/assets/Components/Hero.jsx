/* eslint-disable react/no-unescaped-entities */
const Hero = () => {
  return (
    <div className=" mb-2 mt-16 pt-1 relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-b opacity-100"></div>
      <div className="absolute inset-0 bg-[url('./herobg.png')] bg-cover bg-center opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black">
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4">
          Gateway To Scholarships
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
          Kerala's Largest Scholarship Platform
        </p>
      </div>
    </div>
  );
};

export default Hero;
