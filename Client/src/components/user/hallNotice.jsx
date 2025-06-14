import React from "react";
import { useNavigate } from "react-router-dom";
import sustLogo from "../../assets/sustLogo.png";
import pic1 from "../../assets/hall1jpg.jpg";
import pic2 from "../../assets/hall2.jpg";
import pic3 from "../../assets/hall3.jpg";

export default function HallNotice() {
  const navigate = useNavigate();
  const notices = [
    "Hall will be closed on 10th June for maintenance.",
    "New seat allocation results published.",
    "All residents must update their emergency contact information by 15th June.",
    "Annual cultural night registration is open until 20th June."
  ];

  const backgroundImages = [pic1, pic2, pic3];

  
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-100 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImages[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-12 max-w-3xl w-full mx-4">
        <div className="flex flex-col items-center">
          <img
            src={sustLogo}
            alt="SUST Logo"
            className="w-24 mb-4 drop-shadow-xl"
          />
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-6 tracking-wide font-serif">
            Dormify
          </h2>
          <h3 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
            Hall Notices
          </h3>
          <ul className="w-full space-y-6 max-h-[400px] overflow-y-auto px-4">
            {notices.map((notice, idx) => (
              <li
                key={idx}
                className="bg-emerald-50 border-l-8 border-emerald-500 px-6 py-4 rounded shadow text-gray-800 text-lg"
              >
                {notice}
              </li>
            ))}
          </ul>
          <button
            className="mt-8 px-8 py-3 rounded-full bg-emerald-700 text-white font-semibold shadow-md transition hover:bg-emerald-800 active:scale-95"
            onClick={() => navigate("/user/home")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
