// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loader from "./Loader"; // Import the Loader component

// const Admin = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!sessionStorage.getItem("isLoggedIn")) {
//       navigate("/login");
//     } else {

//       setTimeout(() => setLoading(false), 2000);
//     }
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-green-100">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//    <>
//     <nav className="bg-gray-500 text-white p-4 flex justify-between items-center">
//       {/* Logo on the left */}
//       <div className="text-2xl font-bold">Your Logo</div>

//       {/* Buttons on the right */}
//       <div className="flex gap-4">
//         <button className="bg-red-400 hover:bg-red-600 px-4 py-2 rounded-lg">
//           Logout
//         </button>
//         <button className="bg-green-400 hover:bg-green-600 px-4 py-2 rounded-lg">
//           Add Property
//         </button>
//         <button className="bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-lg">
//           Home
//         </button>
//       </div>
//     </nav>


//     <div className="flex flex-col items-center justify-center h-screen bg-green-100">
//       <h1 className="text-3xl font-bold">Welcome to Admin Page</h1>
//       <button
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
//         onClick={() => {
//           sessionStorage.removeItem("isLoggedIn");
//           navigate("/login");
//         }}
//       >
//         Logout
//       </button>
//     </div>
//     </>
//   );
// };

// export default Admin;

import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Loader from "./Loader";
// import DMH from "../assets/DMHLogo-removebg.png"

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("isLoggedIn")) {
      navigate("/login");
    } else {
      setTimeout(() => setLoading(false), 2000);
    }
  }, [navigate]);

  const handlelogout = ()=>{
    sessionStorage.removeItem("isLoggedIn");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-100">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <nav className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="text-2xl font-bold">DMH Properties</div>
        <div className="flex gap-4">
          <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow"
           onClick={handlelogout}
          >
            Logout
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow" 
            onClick={()=>{navigate("/dmhpropertiesformsubmitonlyforadmin")}}
          >
            Add Property
          </button>
          <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg shadow"
            onClick={()=>{navigate("/")}}
          >
            Home
          </button>
        </div>
      </nav>

      <div className="flex">
        <div
          className={`$ {
            sidebarOpen ? "w-80" : "w-16"
          } h-screen border-r border-blue-300 transition-all duration-300 ${
            sidebarOpen ? 'bg-blue-200' : 'bg-blue-50 border-none'
          } shadow-lg`}
        >
          <button
            className="p-4 text-blue-700 hover:text-blue-900"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {sidebarOpen && (
            <ul className="mt-4 flex flex-col space-y-2 p-4">
              <Link to="/alldetail" className="hover:bg-blue-300 p-2 rounded cursor-pointer">Show All Properties</Link>

              <Link to="/maincorosole" className="hover:bg-blue-300 p-2 rounded cursor-pointer">Set Corosole</Link>
              
            </ul>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center h-screen bg-blue-50">
          <h1 className="text-3xl font-bold text-blue-800">Welcome to Admin Panel</h1>
          
        </div>
      </div>
    </>
  );
};

export default Admin;

// I refined the colors with shades of blue for a consistent, elegant look. Let me know if you want more adjustments! ✨
