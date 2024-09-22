export const sendError = (message, status) => {
  const error = new Error();

  error.message = message;
  error.status = status;

  throw error;
};

export const createDoc = async (model, data) => {
  try {
    const result = await model.create(data);

    return result;
  } catch (error) {
    return error;
  }
};

export const updateDoc = async (model, dataId, data) => {
  try {
    const result = await model.findByIdAndUpdate(dataId, data);

    return result;
  } catch (error) {
    return error;
  }
};

export const deleteDoc = async (model, dataId) => {
  try {
    const result = await model.findByIdAndDelete(dataId);

    return result;
  } catch (error) {
    return error;
  }
};

export const findAll = async (model) => {
  try {
    const result = await model.find();

    return result;
  } catch (error) {
    return error;
  }
};

export const findById = async (model, id) => {
  try {
    const result = await model.find(id);

    return result;
  } catch (error) {
    return error;
  }
};
