import { useEffect, useState } from "react";
import FormModal from "../../../components/ui/FormModal";
import ActionButton from "../../../components/ui/ActionButton";
import SectionTitle from "../../../components/ui/SectionTitle";
import Input from "../../../components/ui/Input";
import { getDepartments } from "../../../services/departmentService";
import { getUsers } from "../../../services/authService";
import PrizeInputCards from "../../../components/ui/PrizeInputCard";
import PrizeCards from "../../../components/ui/PrizeInputCard";

const initialForm = {
  image: "",
  name: "",
  tagline: "",
  description: "",
  category: "",
  date: "",
  location: "",
  department: "",
  institute: "",
  coordinator: "",
  studentCoordinatorName: "",
  studentCoordinatorEmail: "",
  studentCoordinatorPhone: "",
  fees: "",
  prizes: "",
  participationType: "solo",
  groupMinParticipants: 1,
  groupMaxParticipants: 1,
  maxGroupsAllowed: 1,
  status: "Pending",
};

const AddEventForm = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  initialData = null,
  isEditMode = false,
}) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [metaLoading, setMetaLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        image: initialData.image || "",
        name: initialData.name || "",
        tagline: initialData.tagline || "",
        description: initialData.description || "",
        category: initialData.category || "",
        date: initialData.date ? initialData.date.split("T")[0] : "",
        location: initialData.location || "",
        department: initialData.department?._id || initialData.department || "",
        institute: initialData.institute?._id || initialData.institute || "",
        coordinator: initialData.coordinator?._id || initialData.coordinator || "",
        studentCoordinatorName: initialData.studentCoordinatorName || "",
        studentCoordinatorEmail: initialData.studentCoordinatorEmail || "",
        studentCoordinatorPhone: initialData.studentCoordinatorPhone || "",
        fees: initialData.fees ?? "",
        prizes: initialData.prizes || "",
        participationType: initialData.participationType || "solo",
        groupMinParticipants: initialData.groupMinParticipants ?? 1,
        groupMaxParticipants: initialData.groupMaxParticipants ?? 1,
        maxGroupsAllowed: initialData.maxGroupsAllowed ?? 1,
        status: initialData.status || "Pending",
      });
    } else if (isOpen) {
      setForm(initialForm);
      setError("");
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        setMetaLoading(true);

        const [departmentRes, userRes] = await Promise.all([
          getDepartments(""),
          getUsers(""),
        ]);

        const departmentData = departmentRes.data.data || [];
        const userData = userRes.data.data || [];

        setDepartments(departmentData);
        setCoordinators(
          userData.filter((user) => user.role === "event_coordinator")
        );
      } catch (err) {
        console.log("Failed to fetch form data:", err);
      } finally {
        setMetaLoading(false);
      }
    };

    if (isOpen) {
      fetchMeta();
    }
  }, [isOpen]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      if (field === "department") {
        const selectedDepartment = departments.find((d) => d._id === value);
        updated.institute =
          selectedDepartment?.institute?._id || selectedDepartment?.institute || "";
      }

      if (field === "participationType" && value === "solo") {
        updated.groupMinParticipants = 1;
        updated.groupMaxParticipants = 1;
      }

      return updated;
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.date ||
      !form.location.trim() ||
      !form.department ||
      !form.institute ||
      !form.coordinator
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (Number(form.groupMinParticipants) > Number(form.groupMaxParticipants)) {
      setError("Minimum participants cannot be greater than maximum participants");
      return;
    }

    const payload = {
      ...form,
      fees: Number(form.fees) || 0,
      groupMinParticipants: Number(form.groupMinParticipants) || 1,
      groupMaxParticipants: Number(form.groupMaxParticipants) || 1,
      maxGroupsAllowed: Number(form.maxGroupsAllowed) || 1,
      date: new Date(form.date).toISOString(),
    };

    try {
      await onSubmit(payload, resetForm);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save event");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? "Edit Event" : "Create New Event"}
      subtitle={
        isEditMode
          ? "Update event details"
          : "Create and curate the Frolic 2026 experience"
      }
      footer={
        <>
          <button
            onClick={handleClose}
            className="text-white opacity-50 font-semibold"
            type="button"
          >
            Cancel
          </button>
          <ActionButton type="submit" form="add-event-form" disabled={loading}>
            {loading
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
                ? "Update Event"
                : "Save Event"}
          </ActionButton>
        </>
      }
    >
      <form id="add-event-form" onSubmit={handleSubmit} className="space-y-6">
        <SectionTitle>Basic Information</SectionTitle>

        <div className="mb-4">
          <label className="form-label">Event Image URL</label>
          <div className="flex mt-1">
            <span className="px-3 flex items-center bg-white/5 border border-white/10 rounded-l-xl text-indigo-500">
              <i className="bi bi-image"></i>
            </span>
            <input
              type="text"
              placeholder="Paste image URL here"
              className="w-full bg-white/5 border border-white/10 rounded-r-xl px-4 py-3 text-white outline-none placeholder:text-white/30"
              value={form.image}
              onChange={handleChange("image")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Event Name"
            name="name"
            type="text"
            placeholder="Enter Event Name"
            value={form.name}
            onChange={handleChange("name")}
          />

          <Input
            label="Tagline"
            name="tagline"
            type="text"
            placeholder="Enter Tagline"
            value={form.tagline}
            onChange={handleChange("tagline")}
          />

          <div>
            <label className="form-label pl-1">Event Category</label>
            <select
              className="form-input appearance-none cursor-pointer"
              value={form.category}
              onChange={handleChange("category")}
            >
              <option className="bg-slate-900" value="">
                -- Select Category --
              </option>
              <option className="bg-slate-900" value="Technical">
                Technical
              </option>
              <option className="bg-slate-900" value="Cultural">
                Cultural
              </option>
              <option className="bg-slate-900" value="Gaming">
                Gaming
              </option>
              <option className="bg-slate-900" value="Sports">
                Sports
              </option>
            </select>
          </div>

          <Input
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange("date")}
          />

          <Input
            label="Location"
            name="location"
            type="text"
            placeholder="Enter Location"
            value={form.location}
            onChange={handleChange("location")}
          />

          <Input
            label="Fees"
            name="fees"
            type="number"
            placeholder="Enter Fees"
            value={form.fees}
            onChange={handleChange("fees")}
          />
          <div className="md:col-span-2">
            <label className="form-label">Description</label>
            <textarea
              rows="4"
              placeholder="Write event description..."
              className="form-input resize-none"
              value={form.description}
              onChange={handleChange("description")}
            ></textarea>
          </div>
        </div>
        <SectionTitle>Coordinator details</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label pl-1">Department</label>
            <select
              className="form-input appearance-none cursor-pointer"
              value={form.department}
              onChange={handleChange("department")}
              disabled={metaLoading}
            >
              <option className="bg-slate-900" value="">
                {metaLoading ? "Loading Departments..." : "-- Select Department --"}
              </option>
              {departments.map((dept) => (
                <option key={dept._id} className="bg-slate-900" value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label pl-1">Select Event Coordinator</label>
            <select
              className="form-input appearance-none cursor-pointer"
              value={form.coordinator}
              onChange={handleChange("coordinator")}
              disabled={metaLoading}
            >
              <option className="bg-slate-900" value="">
                {metaLoading ? "Loading Coordinators..." : "-- Select Coordinator --"}
              </option>
              {coordinators.map((coordinator) => (
                <option
                  key={coordinator._id}
                  className="bg-slate-900"
                  value={coordinator._id}
                >
                  {coordinator.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Student Coordinator Name"
            name="studentCoordinatorName"
            type="text"
            placeholder="Enter Student Coordinator Name"
            value={form.studentCoordinatorName}
            onChange={handleChange("studentCoordinatorName")}
          />

          <Input
            label="Student Coordinator Email"
            name="studentCoordinatorEmail"
            type="email"
            placeholder="Enter Student Coordinator Email"
            value={form.studentCoordinatorEmail}
            onChange={handleChange("studentCoordinatorEmail")}
          />

          <Input
            label="Student Coordinator Phone"
            name="studentCoordinatorPhone"
            type="text"
            placeholder="Enter Student Coordinator Phone"
            value={form.studentCoordinatorPhone}
            onChange={handleChange("studentCoordinatorPhone")}
          />
          <div>
            <label className="form-label pl-1">Status</label>
            <select
              className="form-input appearance-none cursor-pointer"
              value={form.status}
              onChange={handleChange("status")}
            >
              <option className="bg-slate-900" value="Active">
                Active
              </option>
              <option className="bg-slate-900" value="Pending">
                Pending
              </option>
              <option className="bg-slate-900" value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>
        <SectionTitle>Participation Details</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <label className="block form-label pl-1">Participation Type</label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="solo"
                  checked={form.participationType === "solo"}
                  onChange={handleChange("participationType")}
                  className="accent-indigo-500"
                />
                <span>Solo</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="team"
                  checked={form.participationType === "team"}
                  onChange={handleChange("participationType")}
                  className="accent-indigo-500"
                />
                <span>Team</span>
              </label>
            </div>
          </div>

          <Input
            label={form.participationType === "solo" ? "Max Players" : "Max Teams"}
            name="maxGroupsAllowed"
            type="number"
            placeholder={
              form.participationType === "solo"
                ? "Enter max players"
                : "Enter max teams"
            }
            value={form.maxGroupsAllowed}
            onChange={handleChange("maxGroupsAllowed")}
          />

          {form.participationType === "team" && (
            <>
              <Input
                label="Min Players per Team"
                name="groupMinParticipants"
                type="number"
                placeholder="Enter Min players per Team"
                value={form.groupMinParticipants}
                onChange={handleChange("groupMinParticipants")}
              />
              <Input
                label="Max Players per Team"
                name="groupMaxParticipants"
                type="number"
                placeholder="Enter Max players per Team"
                value={form.groupMaxParticipants}
                onChange={handleChange("groupMaxParticipants")}
              />
            </>
          )}
        </div>
        <SectionTitle>Prizes</SectionTitle>
        <PrizeCards />

        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </FormModal >
  );
};

export default AddEventForm;