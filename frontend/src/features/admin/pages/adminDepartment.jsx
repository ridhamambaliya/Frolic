import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminSectionCard from "../components/AdminSectionCard";
import ActionButton from "../../../components/ui/ActionButton";
import SearchBar from "../../../components/ui/SearchBar";
import IconButton from "../../../components/ui/IconButton";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import AddDepartmentForm from "../modal/AddDepartmentForm";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "../../../services/departmentService";

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // "create" | "edit" | "delete" | null
  const [modal, setModal] = useState(null);

  const [loading, setLoading] = useState({
    list: false,
    create: false,
    edit: false,
    delete: null,
  });

  const fetchDepartments = async (searchValue = "") => {
    try {
      setLoading((prev) => ({ ...prev, list: true }));
      const res = await getDepartments(searchValue);
      setDepartments(res.data?.data || []);
    } catch (error) {
      console.log("Failed to fetch departments:", error);
    } finally {
      setLoading((prev) => ({ ...prev, list: false }));
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDepartments(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const handleCloseModal = () => {
    setSelectedDepartment(null);
    setModal(null);
  };

  const handleOpenCreateModal = () => {
    setSelectedDepartment(null);
    setModal("create");
  };

  const handleOpenEditModal = (department) => {
    setSelectedDepartment(department);
    setModal("edit");
  };

  const handleOpenDeleteModal = (department) => {
    setSelectedDepartment(department);
    setModal("delete");
  };

  const handleCreateDepartment = async (formData, resetForm) => {
    try {
      setLoading((prev) => ({ ...prev, create: true }));
      await createDepartment(formData);
      resetForm();
      handleCloseModal();
      fetchDepartments(search);
    } catch (error) {
      throw error;
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const handleEditDepartment = async (formData, resetForm) => {
    if (!selectedDepartment?._id) return;

    try {
      setLoading((prev) => ({ ...prev, edit: true }));
      await updateDepartment(selectedDepartment._id, formData);
      resetForm();
      handleCloseModal();
      fetchDepartments(search);
    } catch (error) {
      throw error;
    } finally {
      setLoading((prev) => ({ ...prev, edit: false }));
    }
  };

  const handleDeleteDepartment = async () => {
    if (!selectedDepartment?._id) return;

    try {
      setLoading((prev) => ({
        ...prev,
        delete: selectedDepartment._id,
      }));

      await deleteDepartment(selectedDepartment._id);
      handleCloseModal();
      fetchDepartments(search);
    } catch (error) {
      console.log("Failed to delete department:", error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: null }));
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Departments"
        subtitle="Manage and link faculties to departments"
        action={
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Departments..."
            />
            <ActionButton onClick={handleOpenCreateModal}>
              <i className="bi bi-plus-lg me-2"></i>
              Add Department
            </ActionButton>
          </div>
        }
      />

      <AdminSectionCard className="mt-10 p-8">
        <div className="hidden md:grid grid-cols-[2.1fr_1.3fr_1.3fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-white/10 text-[12px] font-bold uppercase tracking-wider text-slate-400/70">
          <div>Department</div>
          <div>Institute</div>
          <div>Coordinator</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        <div className="mt-4 space-y-2">
          {loading.list ? (
            <div className="text-center py-10 text-slate-400">
              Loading departments...
            </div>
          ) : departments.length > 0 ? (
            departments.map((department) => (
              <div
                key={department._id}
                className="admin-row md:grid md:grid-cols-[2.1fr_1.3fr_1.3fr_1fr_1fr] md:items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shrink-0">
                    {department.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <div className="font-bold text-white">{department.name}</div>
                    {department.description ? (
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {department.description}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="hidden md:block">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                    {department.institute?.name || "No Institute"}
                  </span>
                </div>

                <div className="hidden md:block text-slate-300">
                  {department.coordinator?.name || "No Coordinator"}
                </div>

                <div className="mt-3 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      department.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : department.status === "Pending"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}
                  >
                    {department.status}
                  </span>
                </div>

                <div className="flex justify-end gap-2 mt-4 md:mt-0">
                  <IconButton
                    onClick={() => handleOpenEditModal(department)}
                    icon="bi-pencil"
                    variant="edit"
                    animation="hover:rotate-[15deg]"
                  />
                  <IconButton
                    onClick={() => handleOpenDeleteModal(department)}
                    icon="bi-trash3"
                    variant="delete"
                    animation="hover:rotate-[-15deg]"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              No departments found.
            </div>
          )}
        </div>
      </AdminSectionCard>

      <AddDepartmentForm
        isOpen={modal === "create" || modal === "edit"}
        onClose={handleCloseModal}
        onSubmit={modal === "edit" ? handleEditDepartment : handleCreateDepartment}
        loading={modal === "edit" ? loading.edit : loading.create }
        initialData={modal === "edit" ? selectedDepartment : null}
        isEditmode={modal === "edit"}
      />

      <ConfirmModal
        isOpen={modal === "delete"}
        onClose={handleCloseModal}
        onConfirm={handleDeleteDepartment}
        title="Delete Department"
        subtitle="This action is permanent"
        message={
          selectedDepartment
            ? `Are you sure you want to delete ${selectedDepartment.name}? This action cannot be undo.`
            : "Are you sure you want to delete this Department?"
        }
        confirmText="Delete Department"
        loading={loading.delete === selectedDepartment?._id}
      />
    </AdminLayout>
  );
};

export default AdminDepartments;