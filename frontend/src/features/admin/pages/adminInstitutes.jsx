import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../components/AdminPageHeader";
import SearchBar from "../../../components/ui/SearchBar";
import ActionButton from "../../../components/ui/ActionButton";
import AdminSectionCard from "../components/AdminSectionCard";
import IconButton from "../../../components/ui/IconButton";
import AddInstituteForm from "../modal/AddInstituteForm";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import {
    createInstitute,
    deleteInstitute,
    getInstitutes,
    updateInstitute,
} from "../../../services/instituteService";

const AdminInstitutes = () => {
    const [institutes, setInstitutes] = useState([]); // all institue
    const [search, setSearch] = useState(""); // search string
    const [selectedInstitute, setSelectedInstitute] = useState(null); // current delete institute

    // modal: "create" | "delete" | null
    const [modal, setModal] = useState(null);

    // one loading state object
    const [loading, setLoading] = useState({
        list: false,
        create: false,
        edit: false,
        delete: null,
    });

    const fetchInstitutes = async (searchValue = "") => {
        try {
            setLoading((prev) => ({ ...prev, list: true }));

            const res = await getInstitutes(searchValue);
            setInstitutes(res.data.data || []);
        } catch (error) {
            console.log("Failed to fetch institutes:", error);
        } finally {
            setLoading((prev) => ({ ...prev, list: false }));
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchInstitutes(search);
        }, 300);

        return () => clearTimeout(delay);
    }, [search]);

    const handleOpenCreateModal = () => {
        setSelectedInstitute(null);
        setModal("create");
    };

    const handleOpenEditModal = (institute) => {
        setSelectedInstitute(institute);
        setModal("edit");
    };

    const handleOpenDeleteModal = (institute) => {
        setSelectedInstitute(institute);
        setModal("delete");
    };

    const handleCloseModal = () => {
        setSelectedInstitute(null);
        setModal(null);
    };

    const handleCreateInstitute = async (formData, resetForm) => {
        try {
            setLoading((prev) => ({ ...prev, create: true }));

            await createInstitute(formData);

            resetForm();
            handleCloseModal();
            fetchInstitutes(search);
        } catch (error) {
            throw error;
        } finally {
            setLoading((prev) => ({ ...prev, create: false }));
        }
    };

    const handleEditInstitute = async (formData, resetForm) => {
        if (!selectedInstitute?._id) return;

        try {
            setLoading((prev) => ({ ...prev, edit: true }));

            await updateInstitute(selectedInstitute._id, formData);

            resetForm();
            handleCloseModal();
            fetchInstitutes(search);
        } catch (error) {
            throw error;
        } finally {
            setLoading((prev) => ({ ...prev, edit: false }));
        }
    };

    const handleDeleteInstitute = async () => {
        if (!selectedInstitute?._id) return;

        try {
            setLoading((prev) => ({
                ...prev,
                delete: selectedInstitute._id,
            }));

            await deleteInstitute(selectedInstitute._id);

            handleCloseModal();
            fetchInstitutes(search);
        } catch (error) {
            console.log("Failed to delete institute:", error);
        } finally {
            setLoading((prev) => ({ ...prev, delete: null }));
        }
    };

    return (
        <AdminLayout>
            <AdminPageHeader
                title="Institutes"
                subtitle="Manage partner institutes"
                action={
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <SearchBar
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search institutes..."
                        />
                        <ActionButton onClick={handleOpenCreateModal}>
                            <i className="bi bi-plus-lg me-2"></i>
                            Add Institute
                        </ActionButton>
                    </div>
                }
            />

            <AdminSectionCard className="p-5">
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1.2fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-white/10 text-[12px] font-bold uppercase tracking-wider text-slate-400/70">
                    <div>Institute</div>
                    <div>City</div>
                    <div>Departments</div>
                    <div>Coordinator</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                </div>

                <div className="mt-4 space-y-3">
                    {loading.list ? (
                        <div className="text-center py-10 text-slate-400">
                            Loading institutes...
                        </div>
                    ) : institutes.length > 0 ? (
                        institutes.map((institute) => (
                            <div
                                key={institute._id}
                                className="admin-row md:grid md:grid-cols-[2fr_1fr_1fr_1.2fr_1fr_1fr] md:items-center gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shrink-0">
                                        {institute.name
                                            .split(" ")
                                            .map((word) => word[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </div>

                                    <div>
                                        <div className="font-bold text-white">{institute.name}</div>
                                        <div className="text-sm text-slate-400 md:hidden">
                                            {institute.city}
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:block text-slate-300">
                                    {institute.city}
                                </div>

                                <div className="hidden md:block">
                                    <span className="px-3 py-1 rounded-lg text-xs font-bold border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                                        {institute.departments} Departments
                                    </span>
                                </div>

                                <div className="hidden md:block text-slate-300">
                                    {institute.coordinator?.name || "No Coordinator"}
                                </div>

                                <div className="mt-3 md:mt-0">
                                    <span
                                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${institute.status === "Active"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : institute.status === "Pending"
                                                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                : "bg-red-500/10 text-red-400 border-red-500/20"
                                            }`}
                                    >
                                        {institute.status}
                                    </span>
                                </div>

                                <div className="flex justify-end gap-2 mt-4 md:mt-0">
                                    <IconButton
                                        onClick={() => handleOpenEditModal(institute)}
                                        icon="bi-pencil"
                                        variant="edit"
                                        animation="hover:rotate-[15deg]"
                                    />
                                    <IconButton
                                        onClick={() => handleOpenDeleteModal(institute)}
                                        icon="bi-trash3"
                                        variant="delete"
                                        animation="hover:rotate-[-15deg]"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-400">
                            No institutes found.
                        </div>
                    )}
                </div>
            </AdminSectionCard>

            <AddInstituteForm
                isOpen={modal === "create" || modal === "edit"}
                onClose={handleCloseModal}
                onSubmit={modal === "edit" ? handleEditInstitute : handleCreateInstitute}
                loading={modal === "edit" ? loading.edit : loading.create}
                initialData={modal === "edit" ? selectedInstitute : null}
                isEditMode={modal === "edit"}
            />

            <ConfirmModal
                isOpen={modal === "delete"}
                onClose={handleCloseModal}
                onConfirm={handleDeleteInstitute}
                title="Delete Institute"
                subtitle="This action is permanent"
                message={
                    selectedInstitute
                        ? `Are you sure you want to delete ${selectedInstitute.name}? This action cannot be undo.`
                        : "Are you sure you want to delete this institute?"
                }
                confirmText="Delete Institute"
                loading={loading.delete === selectedInstitute?._id}
            />
        </AdminLayout>
    );
};

export default AdminInstitutes;