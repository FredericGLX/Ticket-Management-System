import ProjectService from '../services/project.service';
import UserService from '../services/user.service';

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const dt = date.getDate();
  const formattedDate = `${dt} ${month} ${year}`;
  return formattedDate;
};

export const formatHour = (timestamp) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const formattedHour = `${hour}:${minutes}`;
  return formattedHour;
};

export const removeItemOnce = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const convertToReactSelectObject = (users) => {
  let options = [];
  for (let i = 0; i < users.length; i++) {
    let userObject = {
      value: users[i]._id,
      label: `${users[i].firstName} ${users[i].lastName}`,
    };
    options.push(userObject);
  }
  return options;
};

export const status = [
  { value: 'new', label: 'New' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export const getTicketUsers = (projectId) => {
  const userArray = [];
  ProjectService.get(projectId).then(async (res) => {
    const userId = res.data.assigned;
    await Promise.all(
      userId.map(async (user) => {
        await UserService.get(user).then((res) => {
          userArray.push(res.data);
        });
      })
    );
    return userArray;
  });
};

export const sortByDateAscending = (array) => {
  array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const sortByDateDescending = (array) => {
  array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};
