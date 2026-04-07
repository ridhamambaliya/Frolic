import {
  createDepartmentService,
  deleteDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
} from "./department.service.js";

export const createDepartmentController = async (req, res, next) => {
  try {
    const department = await createDepartmentService(req.body);

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDepartmentsController = async (req, res, next) => {
  try {
    const { search = "" } = req.query;

    const departments = await getAllDepartmentsService(search);

    res.status(200).json({
      success: true,
      message: "Departments fetched successfully",
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentByIdController = async (req, res, next) => {
  try {
    const department = await getDepartmentByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Department fetched successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDepartmentController = async (req, res, next) => {
  try {
    const department = await updateDepartmentService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartmentController = async (req, res, next) => {
  try {
    await deleteDepartmentService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};