import { Router } from 'express';
import { sendSuccess } from '../../utils/apiResponse';

export const adminProductRoutes = Router();

// TODO: Implement admin List
adminProductRoutes.get('/', (req, res) => {
  sendSuccess(res, null, 'Admin List - TODO');
});

// TODO: Implement admin Get
adminProductRoutes.get('/:id', (req, res) => {
  sendSuccess(res, null, 'Admin Get - TODO');
});

// TODO: Implement admin Create
adminProductRoutes.post('/', (req, res) => {
  sendSuccess(res, null, 'Admin Create - TODO');
});

// TODO: Implement admin Update
adminProductRoutes.put('/:id', (req, res) => {
  sendSuccess(res, null, 'Admin Update - TODO');
});

// TODO: Implement admin Delete
adminProductRoutes.delete('/:id', (req, res) => {
  sendSuccess(res, null, 'Admin Delete - TODO');
});
