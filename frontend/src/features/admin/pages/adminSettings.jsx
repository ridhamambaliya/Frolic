import AdminLayout from "../../../components/layout/AdminLayout";
import ActionButton from "../../../components/ui/ActionButton";
import AdminPageHeader from "../components/AdminPageHeader";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <AdminPageHeader
        title="Settings"
        subtitle="Manage admin preferences and system setup."
        action={
          <ActionButton>
            <i className="bi bi-plus-lg me-2"></i> Action
          </ActionButton>
        }
      />
    </AdminLayout>
  );
};

export default AdminSettings;