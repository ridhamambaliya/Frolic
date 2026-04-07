import {
    createInstituteService,
    deleteInstituteService,
    getAllInstitutesService,
    getInstituteByIdService,
    updateInstituteService
} from "./institute.service.js";


export const createInstituteController = async (req, res, next) => {
    try {
        const institute = await createInstituteService(req.body);

        res.status(201).json({
            success: true,
            message: "Institute created successfully",
            data: institute,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllInstitutesController = async (req, res, next) => {
    try {
        const { search = "" } = req.query;

        const institutes = await getAllInstitutesService(search);

        res.status(200).json({
            success: true,
            message: "Institutes fetched successfully",
            data: institutes,
        });
    } catch (error) {
        next(error);
    }
};

export const getInstituteByIdController = async (req, res, next) => {
    try {
        const institute = await getInstituteByIdService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Institute fetched successfully",
            data: institute,
        });
    } catch (error) {
        next(error);
    }
};

export const updateInstituteController = async (req, res, next) => {
    try {
        const institute = await updateInstituteService(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Institute updated successfully",
            data: institute,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteInstituteController = async (req, res, next) => {
    try {
        await deleteInstituteService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Institute deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};