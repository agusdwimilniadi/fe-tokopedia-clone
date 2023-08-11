export const timeAgo = (timestamp) => {
  const currentDate = new Date();
  const createdAtDate = new Date(timestamp);
  const timeDiffInSeconds = (currentDate - createdAtDate) / 1000;

  if (timeDiffInSeconds < 60) {
    return `${Math.floor(timeDiffInSeconds)} seconds ago`;
  } else if (timeDiffInSeconds < 3600) {
    return `${Math.floor(timeDiffInSeconds / 60)} minutes ago`;
  } else if (timeDiffInSeconds < 86400) {
    return `${Math.floor(timeDiffInSeconds / 3600)} hours ago`;
  } else if (timeDiffInSeconds < 2592000) {
    return `${Math.floor(timeDiffInSeconds / 86400)} days ago`;
  } else {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return createdAtDate.toLocaleDateString(undefined, options);
  }
};
