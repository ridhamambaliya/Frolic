import { useEffect, useState } from "react";
import FormModal from "../../../components/ui/FormModal";
import ActionButton from "../../../components/ui/ActionButton";

const UpdateUserRoleModal = ({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
    selectedUser,
}) => {
    const [role, setRole] = useState("student");

    useEffect(() => {
        if (selectedUser?.role) {
            setRole(selectedUser.role);
        }
    }, [selectedUser]);

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title="Update User Role"
            subtitle="Change the role of this user"
            footer={
                <>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white opacity-50 font-semibold"
                    >
                        Cancel
                    </button>
                    <ActionButton
                        onClick={() => onSubmit(role)}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Role"}
                    </ActionButton>
                </>
            }
        >
            <div className="space-y-5">
                <div>
                    <label className="form-label">User</label>
                    <div className="form-input opacity-70">
                        {selectedUser?.name} ({selectedUser?.email})
                    </div>
                </div>

                <div>
                    <label className="form-label">Select Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-input appearance-none cursor-pointer"
                    >
                        <option value="student" className="bg-slate-900">
                            Student
                        </option>
                        <option value="institute_coordinator" className="bg-slate-900">
                            Institute Coordinator
                        </option>
                        <option value="department_coordinator" className="bg-slate-900">
                            Department Coordinator
                        </option>
                    </select>
                </div>
            </div>
        </FormModal>
    );
};

export default UpdateUserRoleModal;