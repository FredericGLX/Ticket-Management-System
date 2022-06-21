import '../scss/components/itemDetails.scss';
import { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { formatDate } from '../helper/helper';
import { formatHour } from '../helper/helper';
import TicketService from '../services/ticket.service';
import ProjectService from '../services/project.service';
import UserService from '../services/user.service';
import SelectList from './SelectList';
import { status, convertToReactSelectObject } from '../helper/helper';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import PageLayout from './PageLayout';

const ItemDetails = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [editable, setEditable] = useState(false);
  const [item, setItem] = useState([]);
  const { projectId, ticketId } = useParams();

  useEffect(() => {
    // Get users currently assigned to the project
    ProjectService.get(projectId).then(async (res) => {
      const userArray = [];
      const userId = res.data.assigned;
      await Promise.all(
        userId.map(async (user) => {
          await UserService.get(user).then((res) => {
            userArray.push(res.data);
          });
        })
      );
      // Sort Users array by alphabetical order
      userArray.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setUsers(userArray);
    });
    if (type === 'ticket') {
      // Get the ticket object
      TicketService.get(ticketId).then((response) => {
        setItem(response.data);
      });
      // Get Project where the ticket belongs
      TicketService.get(ticketId).then(async (res) => {
        const userArray = [];
        const userId = res.data.assigned;
        // Get all users that can be assigned a ticket within the project
        await Promise.all(
          userId.map(async (user) => {
            await UserService.get(user).then((res) => {
              userArray.push(res.data);
            });
          })
        );
        // Sort Users array by alphabetical order
        userArray.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setAssignedUsers(userArray);
      });
    }
    if (type === 'project') {
      // Get the Project object
      ProjectService.get(projectId).then(async (res) => {
        const userArray = [];
        const userId = res.data.assigned;
        // Get all users that can be assigned a ticket within the project
        await Promise.all(
          userId.map(async (user) => {
            await UserService.get(user).then((res) => {
              userArray.push(res.data);
            });
          })
        );
        // Sort Users array by alphabetical order
        userArray.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setAssignedUsers(userArray);
        setItem(res.data);
      });
    }
  }, []);

  console.log(users);

  const formik = useFormik({
    initialValues: {
      title: item.title,
      description: item.description,
      assignedUsers: item.assigned,
      status: item.status,
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      console.log('dqwqw');
      if (type === 'ticket') {
        TicketService.update(ticketId, data).then(() => {
          window.location.reload();
        });
      }
      if (type === 'project') {
        ProjectService.update(projectId, data).then(() => {
          window.location.reload();
        });
      }
    },
  });

  const handleEditable = () => {
    if (editable === false) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  };

  return (
    <PageLayout>
      <div className="item-details-container">
        <form onSubmit={formik.handleSubmit}>
          <h1 className={`item-title`}>
            {!editable ? (
              <>{item.title}</>
            ) : (
              <input
                className={`${editable ? 'edit-mode' : ' '}`}
                type="text"
                name="title"
                defaultValue={item.title}
                onChange={formik.handleChange}
              />
            )}
          </h1>
          <div className="item-users">
            Assigned to:{' '}
            {!editable ? (
              <>
                {assignedUsers.map(
                  (user) =>
                    `${user.firstName} ${user.lastName}${
                      assignedUsers.length > 1 ? ', ' : ''
                    }`
                )}
              </>
            ) : (
              <SelectList
                options={convertToReactSelectObject(users)}
                defaultValue={item.assigned}
                onChange={(assignedUser) => {
                  const newUsers = assignedUser.map((e) => e.value);
                  formik.setFieldValue('assigned', newUsers);
                }}
                isMulti={true}
              />
            )}
          </div>
          <div className="item-status">
            Status:{' '}
            {!editable && item.status ? (
              <>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</>
            ) : (
              <SelectList
                options={status}
                defaultValue={item.status}
                onChange={(status) =>
                  formik.setFieldValue('status', status.value)
                }
                isMulti={false}
              />
            )}
          </div>
          <div className="item-edit">
            Edit
            <FiEdit className="edit-icon" onClick={handleEditable} />
          </div>
          <p
            className={`item-description ${editable ? 'edit-mode' : ' '}`}
            value={formik.values.description}
            onChange={formik.handleChange}
          >
            {!editable ? (
              <>{item.description}</>
            ) : (
              <>
                <textarea
                  type="text"
                  name="description"
                  className="description-editable"
                  defaultValue={item.description}
                  onChange={formik.handleChange}
                />
              </>
            )}
          </p>
          <p className="item-createdAt">
            Created on {formatDate(item.createdAt)} at{' '}
            {formatHour(item.createdAt)} by {item.authorName}
          </p>
          {editable ? (
            <div className="edit-btns">
              <button className="save-btn" type="submit">
                Save
              </button>
              <button className="cancel-btn" onClick={handleEditable}>
                Cancel
              </button>
            </div>
          ) : (
            ''
          )}
        </form>
      </div>
    </PageLayout>
  );
};

export default ItemDetails;
