import { useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import ActionButton from "../../../components/ui/ActionButton";
import AdminSectionCard from "../components/AdminSectionCard";
import EventCard from "../components/EventCard";
import AddEventForm from "../modal/AddEventForm";
import SearchBar from "../../../components/ui/SearchBar";


const AdminEvents = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Events Management"
        subtitle="Create and curate the Frolic 2026 experience."
        action={
          <SearchBar
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Events..."
          />
        }
      />

      <AdminSectionCard className="p-5">
        <EventCard />
      </AdminSectionCard>

      <AddEventForm
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </AdminLayout>
  );
};

export default AdminEvents;