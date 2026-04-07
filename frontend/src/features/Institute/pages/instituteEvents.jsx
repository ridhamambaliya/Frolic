import { useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../../admin/components/AdminPageHeader";
import ActionButton from "../../../components/ui/ActionButton";
import AdminSectionCard from "../../admin/components/AdminSectionCard";
import AddEventForm from "../../admin/modal/AddEventForm";
import SearchBar from "../../../components/ui/SearchBar";
import EventCard from "../../admin/components/EventCard";

const InstituteEvent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Events Management"
        subtitle="Create and manage institute-level and department events."
        action={
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Events..."
            />
            <ActionButton onClick={() => setOpenModal(true)}>
              <i className="bi bi-plus-lg me-2"></i>
              Create Event
            </ActionButton>
          </div>
        }
      />

      <AdminSectionCard className="p-5">
        <EventCard search={search} />
      </AdminSectionCard>

      <AddEventForm
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </AdminLayout>
  );
};

export default InstituteEvent;