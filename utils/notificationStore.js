const notificationStore = new Map();

export const setNotification = (key, value) => {
  notificationStore.set(key, value);
  setTimeout(() => notificationStore.delete(key), 30000);
};

export const getNotification = (key) => {
  const notification = notificationStore.get(key);
  notificationStore.delete(key);

  return notification;
};
