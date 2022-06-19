import '../../../scss/components/addTicketForm.scss';
import '../../../scss/variables.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectService from '../../../services/project.service';
import UserService from '../../../services/user.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectList from '../../SelectList';
import { convertToReactSelectObject, status } from '../../../helper/helper';

const AddProjectForm = ({ open, onClose, children }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getAll().then((response) => {
      setUsers(response.data);
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
      assigned: [],
      status: '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      console.log(data);
      ProjectService.create(data).then(() => {
        navigate('/projects');
        window.location.reload();
      });
    },
  });

  return (
    <div className="issue-form-container">
      <h1>Add Project</h1>
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

export default AddProjectForm;
