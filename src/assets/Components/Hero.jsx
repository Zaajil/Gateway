/* eslint-disable react/no-unescaped-entities */
const Hero = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100"></div>
      <div className="absolute inset-0 bg-cover bg-center opacity-50">
        <img src="./herobg.png" alt="Hero Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center text-white">
        <h1 className="text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4">
          Gateway To Scholarships
        </h1>
        <p className="text-base md:text-xl lg:text-2xl xl:text-3xl">
          Kerala's Largest Scholarship Platform
        </p>
      </div>
    </div>
  );
};

export default Hero;
