import '../../../scss/components/addTicketForm.scss';
import '../../../scss/variables.scss';
import TicketService from '../../../services/ticket.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SelectList from '../../SelectList';
import { convertToReactSelectObject, status } from '../../../helper/helper';
import ProjectService from '../../../services/project.service';
import UserService from '../../../services/user.service';

const AddTicketForm = () => {
  const { projectId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
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
      setUsers(userArray);
    });
  }, []);

  const validationSchema = () => {
    return Yup.object().shape({
      title: Yup.string().required('A title is required'),
      description: Yup.string().required('A description is required'),
    });
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      authorId: JSON.parse(localStorage.getItem('user')).id,
      authorName: `${JSON.parse(localStorage.getItem('user')).firstName} ${
        JSON.parse(localStorage.getItem('user')).lastName
      }`,
      assignedUsers: [],
      status: '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      TicketService.create(projectId, data).then(() => {
        window.location.reload();
      });
    },
  });

  return (
    <div className="issue-form-container">
      <h1>Add Ticket</h1>
      <form onSubmit={formik.handleSubmit} className="issue-form">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {formik.errors.title ? formik.errors.title : null}
        <label>Description</label>
        <textarea
          type="text"
          name="description"
          className="input-description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.errors.description ? formik.errors.description : null}
        Assign to:
        <SelectList
          options={convertToReactSelectObject(users)}
          value={formik.values.assigned}
          onChange={(assignedUser) =>
            formik.setFieldValue('assigned', assignedUser)
          }
          isMulti={true}
        />
        Status:
        <SelectList
          options={status}
          value={formik.values.status}
          onChange={(status) => formik.setFieldValue('status', status)}
          isMulti={false}
        />
        <button className="form-submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;
