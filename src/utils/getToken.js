export const tokenAPI = (token) => {
  return {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  };
};
