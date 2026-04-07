import { Router } from 'express';
import { addDepartment } from '../controller/department.controller';

const departmentRouter = Router()

departmentRouter.post('/addbranch',addDepartment);

export default departmentRouter;