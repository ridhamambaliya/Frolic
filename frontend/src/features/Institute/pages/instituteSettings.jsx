import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../../admin/components/AdminPageHeader";
import AdminSectionCard from "../../admin/components/AdminSectionCard";
import ActionButton from "../../../components/ui/ActionButton";
import Input from "../../../components/ui/Input";
import { useAuthContext } from "../../auth/context/AuthContext";

const InstituteSettings = () => {
  const { meta } = useAuthContext();
  const institute = meta?.institute;

  const [form, setForm] = useState({
    name: "",
    code: "",
    city: "",
    supportEmail: "",
    description: "",
  });

  useEffect(() => {
    if (institute) {
      setForm({
        name: institute.name || "",
        code: institute.code || "",
        city: institute.city || "",
        supportEmail: "",
        description: institute.description || "",
      });
    }
  }, [institute]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Settings"
        subtitle="Manage institute preferences and profile details."
        action={
          <ActionButton disabled>
            <i className="bi bi-check2-circle me-2"></i>
            Save Changes
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <AdminSectionCard className="p-6 xl:col-span-2">
          <h3 className="text-lg font-bold text-white mb-6">Institute Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Institute Name" type="text" placeholder="Enter institute name" value={form.name} onChange={handleChange("name")} />
            <Input label="Institute Code" type="text" placeholder="Enter institute code" value={form.code} onChange={handleChange("code")} />
            <Input label="City" type="text" placeholder="Enter city" value={form.city} onChange={handleChange("city")} />
            <Input label="Support Email" type="email" placeholder="Enter support email" value={form.supportEmail} onChange={handleChange("supportEmail")} />
          </div>

          <div className="mt-6">
            <label className="form-label">Description</label>
            <textarea
              rows="5"
              className="form-input resize-none"
              value={form.description}
              onChange={handleChange("description")}
            ></textarea>
          </div>
        </AdminSectionCard>

        <AdminSectionCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-5">Quick Preferences</h3>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="font-semibold text-white">Department Access</div>
              <p className="text-sm text-slate-400 mt-1">
                Manage your institute departments from one place.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="font-semibold text-white">Event Visibility</div>
              <p className="text-sm text-slate-400 mt-1">
                Review and manage events created under your institute.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="font-semibold text-white">Notifications</div>
              <p className="text-sm text-slate-400 mt-1">
                Stay updated on coordinator changes and event updates.
              </p>
            </div>
          </div>
        </AdminSectionCard>
      </div>
    </AdminLayout>
  );
};

export default InstituteSettings;