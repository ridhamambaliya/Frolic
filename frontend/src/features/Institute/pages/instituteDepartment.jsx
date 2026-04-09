import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import ActionButton from "../../../components/ui/ActionButton";
import AdminPageHeader from "../../admin/components/AdminPageHeader";
import AdminSectionCard from "../../admin/components/AdminSectionCard";
import SearchBar from "../../../components/ui/SearchBar";
import IconButton from "../../../components/ui/IconButton";
import { getDepartments } from "../../../services/departmentService";

const InstituteDepartment = () => {
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async (searchValue = "") => {
    try {
      setLoading(true);
      const res = await getDepartments(searchValue);
      setDepartments(res.data?.data || []);
    } catch (error) {
      console.log("Failed to fetch departments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDepartments(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Departments"
        subtitle="Manage departments and assign department coordinators."
        action={
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments..."
            />
            <ActionButton disabled>
              <i className="bi bi-plus-lg me-2"></i>
              Add Department
            </ActionButton>
          </div>
        }
      />

      <AdminSectionCard className="p-5">
        <div className="hidden md:grid grid-cols-[2fr_1.4fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-white/10 text-[12px] font-bold uppercase tracking-wider text-slate-400/70">
          <div>Department</div>
          <div>Coordinator</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        <div className="mt-4 space-y-3">
          {loading ? (
            <div className="text-center py-10 text-slate-400">Loading departments...</div>
          ) : departments.length > 0 ? (
            departments.map((department) => (
              <div
                key={department._id}
                className="admin-row md:grid md:grid-cols-[2fr_1.4fr_1fr_1fr] md:items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shrink-0">
                    {department.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}
                  </div>

                  <div>
                    <div className="font-bold text-white">{department.name}</div>
                    <div className="text-sm text-slate-400 md:hidden">
                      {department.coordinator?.name || "No Coordinator"}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block text-slate-300">
                  {department.coordinator?.name || "No Coordinator"}
                </div>

                <div>
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
                  <IconButton icon="bi-pencil" variant="edit" disabled />
                  <IconButton icon="bi-trash3" variant="delete" disabled />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">No departments found.</div>
          )}
        </div>
      </AdminSectionCard>
    </AdminLayout>
  );
};

export default InstituteDepartment;