import { useEffect, useState } from "react";
import ActionButton from "../../../components/ui/ActionButton";
import FormModal from "../../../components/ui/FormModal";
import Input from "../../../components/ui/Input";
import SectionTitle from "../../../components/ui/SectionTitle";
import { getUsers } from "../../../services/authService";

const initialForm = {
  name: "",
  code: "",
  city: "",
  coordinator: "",
  status: "Pending",
  description: "",
};

const AddInstituteForm = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  initialData = null,
  isEditMode = false,
}) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [coordinators, setCoordinators] = useState([]);
  const [coordinatorLoading, setCoordinatorLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        name: initialData.name || "",
        code: initialData.code || "",
        city: initialData.city || "",
        coordinator: initialData.coordinator?._id || "",
        status: initialData.status || "Pending",
        description: initialData.description || "",
      });
    } else if (isOpen && !initialData) {
      setForm(initialForm);
    }
  }, [isOpen, initialData]);


  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        setCoordinatorLoading(true);
        const res = await getUsers();
        const allUsers = res.data.data || [];

        const instituteCoordinators = allUsers.filter(
          (user) => user.role === "institute_coordinator"
        );

        setCoordinators(instituteCoordinators);
      } catch (error) {
        console.log("Failed to fetch coordinators:", error);
      } finally {
        setCoordinatorLoading(false);
      }
    };

    if (isOpen) {
      fetchCoordinators();
    }
  }, [isOpen]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
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
      !form.code.trim() ||
      !form.city.trim() ||
      !form.coordinator
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await onSubmit({ ...form }, resetForm);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save institute");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? "Edit Institute" : "Create New Institute"}
      subtitle={
        isEditMode
          ? "Update institute details for Frolic 2026"
          : "Add a new institute to the Frolic 2026 network"
      }
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            className="text-white opacity-50 font-semibold"
          >
            Discard
          </button>
          <ActionButton
            type="submit"
            form="add-institute-form"
            disabled={loading}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
                ? "Update Institute"
                : "Save Institute"}
          </ActionButton>
        </>
      }
    >
      <form onSubmit={handleSubmit} id="add-institute-form" className="space-y-6">
        <SectionTitle>
          Institute Information
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="form-label">Institute Name</label>
            <div className="flex mt-2">
              <span className="px-3 flex items-center bg-white/5 border border-white/10 rounded-l-xl text-indigo-500">
                <i className="bi bi-bank"></i>
              </span>
              <input
                type="text"
                placeholder="e.g. Darshan University"
                className="w-full bg-white/5 border border-white/10 rounded-r-xl px-4 py-3 text-white outline-none placeholder:text-white/30"
                value={form.name}
                onChange={handleChange("name")}
                required
              />
            </div>
          </div>

          <div>
            <Input
              label="Institute Code"
              name="code"
              type="text"
              placeholder="e.g. DU2026"
              value={form.code}
              onChange={handleChange("code")}
            />
          </div>

          <div>
            <Input
              label="City"
              name="city"
              type="text"
              placeholder="e.g. Rajkot"
              value={form.city}
              onChange={handleChange("city")}
            />
          </div>

          <div>
            <label className="form-label">Institute Coordinator</label>
            <select
              className="form-input appearance-none cursor-pointer"
              value={form.coordinator}
              onChange={handleChange("coordinator")}
              disabled={coordinatorLoading}
            >
              <option className="bg-slate-900" value="">
                {coordinatorLoading
                  ? "Loading coordinators..."
                  : "-- Select Coordinator --"}
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

          <div>
            <label className="form-label">Status</label>
            <select
              className="form-input appearance-none cursor-pointer"
              value={form.status}
              onChange={handleChange("status")}>
              <option className="bg-slate-900" value="Active" >Active</option>
              <option className="bg-slate-900" value="Pending" >Pending</option>
              <option className="bg-slate-900" value="Inactive" >Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="form-label">Description</label>
            <textarea
              rows="4"
              placeholder="Write a short description about the institute..."
              className="form-input resize-none"
              value={form.description}
              onChange={handleChange("description")}
            ></textarea>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <i className="bi bi-patch-check"></i>
          </div>

          <div>
            <div className="text-sm font-bold">Verification Note</div>
            <div className="text-xs text-slate-400">
              This institute will be available in the admin panel immediately after saving.
            </div>
          </div>
        </div>
      </form>
    </FormModal>
  );
};

export default AddInstituteForm;