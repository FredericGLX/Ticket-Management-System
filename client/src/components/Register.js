import '../scss/components/auth.scss';
import '../scss/variables.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object().shape({
      firstName: Yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters')
        .max(20, 'First name must not exceed 20 characters'),
      lastName: Yup.string()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters')
        .max(20, 'Last name must not exceed 20 characters'),
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password must not exceed 30 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      AuthService.register(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );
      navigate('/home');
    },
  });

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Register</h1>

        <form className="form-container" onSubmit={formik.handleSubmit}>
          <div>
            <label>First name</label>
            <input
              name="firstName"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <div className="text-error">
              {formik.errors.firstName ? formik.errors.firstName : null}
            </div>
          </div>
          <div>
            <label>Last name</label>
            <input
              name="lastName"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <div className="text-error">
              {formik.errors.lastName ? formik.errors.lastName : null}
            </div>
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? formik.errors.email : null}
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className="text-error">
              {formik.errors.password ? formik.errors.password : null}
            </div>
          </div>
          <div>
            <label>Confirm password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <div className="text-error">
              {formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : null}
            </div>
          </div>
          <div className="submit-btn-container">
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
        <p>
          Already have an account?{' '}
          <span className="clickHere" onClick={() => navigate('/login')}>
            Click here
          </span>{' '}
          to sign in.
        </p>
      </div>
    </div>
  );
};

export default Register;
