

const addDepartment = async (req , res) => {
    try { 
        const { branchName, department, coordinator} = req.body;
        const existingBranch = await branch.findOne({ branchName });
        if (existingBranch) {
            return res.status(400).json({ message: "Branch already registered" });
        }
        const newBranch = new Branch({
            branchName,
            department,
            coordinator
        });
        await newBranch.save();
        res.status(201).json({
            message: "Branch registered successfully",
            branch: newBranch
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "server error"});
    }
}