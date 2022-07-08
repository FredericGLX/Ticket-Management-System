import '../scss/components/auth.scss';
import '../scss/variables.scss';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password must not exceed 30 characters'),
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      AuthService.login(data.email, data.password).then(() => {
        navigate('/home');
        window.location.reload();
      });
    },
  });

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Sign in</h1>

        <form className="form-container" onSubmit={formik.handleSubmit}>
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
          <div className="submit-btn-container">
            <button className="submit-btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <p>
          Don't have an accout?{' '}
          <span className="clickHere" onClick={() => navigate('/signup')}>
            Click here
          </span>{' '}
          to create one.
        </p>
      </div>
    </div>
  );
};

export default Register;
