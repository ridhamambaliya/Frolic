import BgUser from "../common/BgUser";
import AppBar from "../ui/AppBar";
import SideBar from "../ui/SideBar";


const AdminLayout = ({ children }) => {
  return (
    <div className="bg-secondary text-slate-100 min-h-screen font-main overflow-x-hidden">
      <BgUser />
      <AppBar />
      <div className="flex flex-col lg:flex-row">
        <SideBar />
        <main className="flex-1 p-6 lg:p-10 mb-20 lg:mb-0 z-40">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;