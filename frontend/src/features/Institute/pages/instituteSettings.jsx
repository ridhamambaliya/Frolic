import AdminLayout from "../../../components/layout/AdminLayout";
import AdminPageHeader from "../../admin/components/AdminPageHeader";
import AdminSectionCard from "../../admin/components/AdminSectionCard";
import ActionButton from "../../../components/ui/ActionButton";
import Input from "../../../components/ui/Input";

const InstituteSettings = () => {
  return (
    <AdminLayout>
      <AdminPageHeader
        title="Settings"
        subtitle="Manage institute preferences and profile details."
        action={
          <ActionButton>
            <i className="bi bi-check2-circle me-2"></i>
            Save Changes
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <AdminSectionCard className="p-6 xl:col-span-2">
          <h3 className="text-lg font-bold text-white mb-6">Institute Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Institute Name"
              type="text"
              placeholder="Enter institute name"
              value="Frolic Institute"
              onChange={() => {}}
            />

            <Input
              label="Institute Code"
              type="text"
              placeholder="Enter institute code"
              value="FRL2026"
              onChange={() => {}}
            />

            <Input
              label="City"
              type="text"
              placeholder="Enter city"
              value="Rajkot"
              onChange={() => {}}
            />

            <Input
              label="Support Email"
              type="email"
              placeholder="Enter support email"
              value="support@frolic.com"
              onChange={() => {}}
            />
          </div>

          <div className="mt-6">
            <label className="form-label">Description</label>
            <textarea
              rows="5"
              className="form-input resize-none"
              defaultValue="Institute level settings and event management preferences."
            ></textarea>
          </div>
        </AdminSectionCard>

        <AdminSectionCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-5">Quick Preferences</h3>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="font-semibold text-white">Department Access</div>
              <p className="text-sm text-slate-400 mt-1">
                Allow coordinators to manage their own departments.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="font-semibold text-white">Event Visibility</div>
              <p className="text-sm text-slate-400 mt-1">
                Control whether department events are publicly visible.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="font-semibold text-white">Notifications</div>
              <p className="text-sm text-slate-400 mt-1">
                Receive alerts for event approvals and coordinator updates.
              </p>
            </div>
          </div>
        </AdminSectionCard>
      </div>
    </AdminLayout>
  );
};

export default InstituteSettings;