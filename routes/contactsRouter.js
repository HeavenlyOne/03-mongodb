import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateStatusSchema } from "../schemas/contactsSchemas.js";
import { auth } from "../helpers/auth.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

const contactsRouter = express.Router();

contactsRouter.get('/', auth, ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", auth, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch('/:id/favorite', validateBody(updateStatusSchema), updateStatusContact);


export default contactsRouter;
