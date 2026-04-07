import { useState } from "react";
import FormModal from "../../../components/ui/FormModal";
import ActionButton from "../../../components/ui/ActionButton";
import SectionTitle from "../../../components/ui/SectionTitle";
import Input from "../../../components/ui/Input";

const AddEventForm = ({ isOpen, onClose }) => {
  const [type, setType] = useState("solo");

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Event"
      footer={
        <>
          <button
            onClick={onClose}
            className="text-white opacity-50 font-semibold"
            type="button"
          >
            Cancel
          </button>
          <ActionButton>Save Event</ActionButton>
        </>
      }
    >
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
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Event Name"
            type="text"
            placeholder="Enter Event Name"
          />
        </div>

        <div>
          <label className="form-label pl-1">Event Category</label>
          <select className="form-input appearance-none cursor-pointer">
            <option className="bg-slate-900">-- Select Category --</option>
            <option className="bg-slate-900">Technical</option>
            <option className="bg-slate-900">Cultural</option>
            <option className="bg-slate-900">Gaming</option>
            <option className="bg-slate-900">Sports</option>
          </select>
        </div>

        <div>
          <Input
            label="Date"
            type="date" />
        </div>

        <div>
          <Input
            label="Location"
            type="text"
            placeholder="Enter Location" />
        </div>

        <div>
          <label className="form-label pl-1">Department</label>
          <select className="form-input appearance-none cursor-pointer">
            <option className="bg-slate-900">-- Select Department --</option>
            <option className="bg-slate-900">DICA</option>
            <option className="bg-slate-900">DIET</option>
            <option className="bg-slate-900">DIM</option>
          </select>
        </div>

        <div>
          <Input
            label="Fees"
            type="number"
            placeholder="Enter Fees" />
        </div>

        <div>
          <label className="form-label pl-1">Select Event Coordinator</label>
          <select className="form-input appearance-none cursor-pointer">
            <option className="bg-slate-900">-- select Coordinator --</option>
            <option className="bg-slate-900">Prof. Rahul Sharma</option>
            <option className="bg-slate-900">Prof. Meera Patel</option>
          </select>
        </div>

        <div>
          <label className="form-label">Select Student Coordinator</label>
          <select className="form-input appearance-none cursor-pointer">
            <option className="bg-slate-900">-- select Coordinator --</option>
            <option className="bg-slate-900">Student 1</option>
            <option className="bg-slate-900">Student 2</option>
          </select>
        </div>
      </div>

      <SectionTitle>Participation Details</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex gap-10">
          <label className="block form-label pl-1">
            Participation Type
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="solo"
                checked={type === "solo"}
                onChange={(e) => setType(e.target.value)}
                className="accent-indigo-500"
              />
              <span>Solo</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="team"
                checked={type === "team"}
                onChange={(e) => setType(e.target.value)}
                className="accent-indigo-500"
              />
              <span>Team</span>
            </label>
          </div>
        </div>

        <div>
          {type === "solo" ? (
            <Input
              label="Max Players"
              type="number"
              placeholder="Enter max players" />
          ) : (
            <Input
              label="Max Teams"
              type="number"
              placeholder="Enter max teams" />
          )}
        </div>
        {type === "solo" ? (
          null
        ) : (
          <>
            <div>
              <Input
                label="Min Players per Team"
                type="number"
                placeholder="Enter Min players per Team" />
            </div>
            <div>
              <Input
                label="Max Players per Team"
                type="number"
                placeholder="Enter Max players per Team" />
            </div>
          </>
        )}

        
      </div>

    </FormModal>
  );
};

export default AddEventForm;