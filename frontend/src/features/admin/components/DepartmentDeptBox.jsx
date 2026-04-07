import IconButton from "../../../components/ui/IconButton";

const DepartmentDeptBox = () => {
  const avatarColors = [
    "from-indigo-500 to-purple-600",
    "from-pink-500 to-violet-600",
    "from-green-400 to-cyan-500",
  ];

  const badgeColors = [
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  ];

  const departmentsData = [
    {
      branchName: "Master of Computer Application",
      cordinatorName: "Prof. Swati",
      departmentName: "DICA",
      totalEvents: 12,
    },
    {
      branchName: "Bachelor's of Computer Application",
      cordinatorName: "Prof. Ashok",
      departmentName: "DICA",
      totalEvents: 12,
    },
    {
      branchName: "Bachelor's of Business Administration",
      cordinatorName: "Prof. Faah",
      departmentName: "DIM",
      totalEvents: 10,
    },
  ];

  const getRandom = (arr) => Math.floor(Math.random() * arr.length);

  return departmentsData.map((department, index) => {
    const arrindex = getRandom(avatarColors);
    const badge = badgeColors[arrindex];
    const avatar = avatarColors[arrindex];

    return (
      <div key={index} className="admin-row grid grid-cols-[30%_30%_20%_20%] items-center px-4 py-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatar} flex items-center justify-center font-bold mr-4 px-2 relative`}>
            MCA
          </div>

          <div>
            <div className="font-bold text-white">{department.branchName}</div>
            <div className="text-sm text-slate-400">{department.cordinatorName}</div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-start">
          <span className={`px-3 py-1 ${badge} text-[12px] font-bold rounded-lg uppercase tracking-wider border`}>
            {department.departmentName}
          </span>
        </div>

        <div className="hidden md:flex flex-1 justify-start">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[12px] font-bold rounded-lg uppercase tracking-wider border">
            {department.totalEvents} Events
          </span>
        </div>

        <div className="flex justify-end gap-2">
          <IconButton icon="bi-pencil" variant="edit" animation="hover:rotate-[15deg]"/>
          <IconButton icon="bi-trash3" variant="delete" animation="hover:rotate-[-15deg]" />
        </div>
      </div>
    );
  });
};

export default DepartmentDeptBox;