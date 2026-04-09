import { useEffect, useState } from "react";
import ActionButton from "../../../components/ui/ActionButton";
import FormModal from "../../../components/ui/FormModal";
import SectionTitle from "../../../components/ui/SectionTitle";
import { getInstitutes } from "../../../services/instituteService";
import { getUsers } from "../../../services/authService";

const initialForm = {
  name: "",
  institute: "",
  coordinator: "",
  status: "Pending",
  description: "",
};

const AddDepartmentForm = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  initialData = null,
  isEditmode = false,
}) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        name: initialData.name || "",
        institute: initialData.institute?._id || "",
        coordinator:
          initialData.coordinator?._id || "",
        status: initialData.status || "Pending",
        description: initialData.description || "",
      });
    } else if (isOpen && !initialData) {
      setForm(initialForm);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        setDropdownLoading(true);

        const [instituteRes, userRes] = await Promise.all([
          getInstitutes(),
          getUsers(),
        ]);

        setInstitutes(instituteRes.data?.data || []);

        const allUsers = userRes.data?.data || [];

        const departmentCoordinators = allUsers.filter(
          (user) => user.role === "department_coordinator" && !user.isBanned
        );
        setCoordinators(departmentCoordinators);
      } catch (error) {
        console.log("Failed to load form data:", error);
      } finally {
        setDropdownLoading(false);
      }
    };
    if (isOpen) {
      loadDropdowns();
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
      !form.institute ||
      !form.coordinator
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await onSubmit({ ...form }, resetForm);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save department");
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditmode ? "Edit Department" : "Create New Department"}
      subtitle={
        isEditmode
          ? "Update department details"
          : "Add a new department to an institute"
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
            form="add-department-form"
            disabled={loading || dropdownLoading}
          >
            {loading
              ? isEditmode
                ? "Updating..."
                : "Saving..."
              : isEditmode
                ? "Update Department"
                : "Save Department"}
          </ActionButton>
        </>
      }
    >
      <form id="add-department-form" onSubmit={handleSubmit} className="space-y-6">
        <SectionTitle>Department Information</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="form-label">Department Name</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="e.g. Department of Computer Applications"
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Institute</label>
            <select
              value={form.institute}
              onChange={handleChange("institute")}
              className="form-input appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">
                -- Select Institute --
              </option>
              {institutes.map((institute) => (
                <option
                  key={institute._id}
                  value={institute._id}
                  className="bg-slate-900"
                >
                  {institute.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Coordinator</label>
            <select
              value={form.coordinator}
              onChange={handleChange("coordinator")}
              className="form-input appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">
                -- Select Coordinator --
              </option>
              {coordinators.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                  className="bg-slate-900"
                >
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Status</label>
            <select
              value={form.status}
              onChange={handleChange("status")}
              className="form-input appearance-none cursor-pointer"
            >
              <option value="Active" className="bg-slate-900">
                Active
              </option>
              <option value="Pending" className="bg-slate-900">
                Pending
              </option>
              <option value="Inactive" className="bg-slate-900">
                Inactive
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="form-label">Description</label>
            <textarea
              rows="4"
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Write a short description..."
              className="form-input resize-none"
            ></textarea>
          </div>
        </div>

        {error && <p className="text-sm text-red-400 font-medium">{error}</p>}

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

export default AddDepartmentForm;