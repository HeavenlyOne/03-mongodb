import HttpError from '../helpers/HttpError.js';
import { Contact } from '../models/contact.js';

export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    const error = HttpError(404);
    return res.status(error.status).json({
      message: error.message,
    });
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    const error = HttpError(404);
    return res.status(error.status).json({
      message: error.message,
    })
  };
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

export const createContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
};

export const updateContact = async (req, res) => {
  // console.log(req.body)
  // console.log(req.params)
  // if (!req.body) {
  //   console.log('err')
  //   return res.status(400).json({
  //     status: 400,
  //     message: 'Body must have at least one field',
  //   });
  // }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
        const error = HttpError(404);
        return res.status(error.status).json({
          message: error.message,
        });
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
  // console.log(result)
  if (!result) {
    const error = HttpError(404);
    return res.status(error.status).json({
      message: error.message,
    });
  }
  res.json({
    status: "success",
    code: 200,
    body: {
      result
    }
  })

}
