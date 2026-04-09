import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../../admin/components/AdminPageHeader";
import ActionButton from "../../../components/ui/ActionButton";
import AdminSectionCard from "../../admin/components/AdminSectionCard";
import AddEventForm from "../../admin/modal/AddEventForm";
import SearchBar from "../../../components/ui/SearchBar";
import EventCard from "../../admin/components/EventCard";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import EventDetailsModal from "../../admin/modal/EventDetailModal";
import { createEvent, deleteEvent, getEvents } from "../../../services/eventService";

const InstituteEvent = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState({
    list: false,
    create: false,
    delete: false,
  });

  const fetchEvents = async (searchValue = "") => {
    try {
      setLoading((prev) => ({ ...prev, list: true }));
      const res = await getEvents(searchValue);
      setEvents(res.data.data || []);
    } catch (error) {
      console.log("Failed to fetch events:", error);
    } finally {
      setLoading((prev) => ({ ...prev, list: false }));
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchEvents(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setModal(null);
  };

  const handleCreateEvent = async (formData, resetForm) => {
    try {
      setLoading((prev) => ({ ...prev, create: true }));
      await createEvent(formData);
      resetForm();
      handleCloseModal();
      fetchEvents(search);
    } catch (error) {
      throw error;
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent?._id) return;

    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      await deleteEvent(selectedEvent._id);
      handleCloseModal();
      fetchEvents(search);
    } catch (error) {
      console.log("Failed to delete event:", error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

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
            <ActionButton onClick={() => setModal("create")}>
              <i className="bi bi-plus-lg me-2"></i>
              Create Event
            </ActionButton>
          </div>
        }
      />

      <AdminSectionCard className="p-5">
        <EventCard
          events={events}
          loading={loading.list}
          onView={(event) => {
            setSelectedEvent(event);
            setModal("view");
          }}
          onDelete={(event) => {
            setSelectedEvent(event);
            setModal("delete");
          }}
        />
      </AdminSectionCard>

      <AddEventForm
        isOpen={modal === "create"}
        onClose={handleCloseModal}
        onSubmit={handleCreateEvent}
        loading={loading.create}
      />

      <EventDetailsModal
        isOpen={modal === "view"}
        onClose={handleCloseModal}
        event={selectedEvent}
      />

      <ConfirmModal
        isOpen={modal === "delete"}
        onClose={handleCloseModal}
        onConfirm={handleDeleteEvent}
        title="Delete Event"
        subtitle="This action is permanent"
        message={
          selectedEvent
            ? `Are you sure you want to delete ${selectedEvent.name}?`
            : "Are you sure you want to delete this event?"
        }
        confirmText="Delete Event"
        loading={loading.delete}
      />
    </AdminLayout>
  );
};

export default InstituteEvent;