export const createUserValidator = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "username length greater than 5 and less than 32",
    },
  },
  password: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
    },
    errorMessage: "The password must be at least 5 characters",
  },
};

export const updateUserValidator = {
  username: createUserValidator.username,
  password: createUserValidator.password,
};
