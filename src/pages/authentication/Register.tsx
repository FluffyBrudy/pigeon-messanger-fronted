import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { object as yobject, string as ystring, ref as yref } from "yup";
import { LOGIN_ROUTE } from "../../router/routerPath";
import { api } from "../../api/interceptor";
import { REGISTER_ENDPOINT } from "../../api/endpoints";

interface SubmitValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterSchema = yobject().shape({
  username: ystring()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: ystring().email("Email is invalid").required("Email is required"),
  password: ystring()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .required("Password is required"),
  confirmPassword: ystring()
    .oneOf([yref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const handleSubmit = ({
    username,
    email,
    password,
    confirmPassword,
  }: SubmitValues) => {
    console.log(username, email, password, confirmPassword);
    api
      .post(REGISTER_ENDPOINT, { username, email, password })
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  };

  const initValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-[min(700px,97vw)] sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Register</h1>
            </div>
            <Formik
              initialValues={{ ...initValues }}
              validationSchema={RegisterSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        className={`peer placeholder-transparent h-10 w-full border-b-2 bg-white text-gray-900 focus:outline-none focus:border-rose-600 ${
                          errors.username && touched.username
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Username"
                      />
                      <label
                        htmlFor="username"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Username
                      </label>
                      {errors.username && touched.username && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.username}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className={`peer placeholder-transparent h-10 w-full border-b-2 bg-white text-gray-900 focus:outline-none focus:border-rose-600 ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className={`peer placeholder-transparent h-10 w-full border-b-2 bg-white text-gray-900 focus:outline-none focus:border-rose-600 ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className={`peer placeholder-transparent h-10 w-full border-b-2 bg-white text-gray-900 focus:outline-none focus:border-rose-600 ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Confirm Password"
                      />
                      <label
                        htmlFor="confirmPassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Confirm Password
                      </label>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-cyan-500 text-white rounded-md px-2 py-1 w-full"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="w-full flex justify-center mt-6">
              <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <Link to={LOGIN_ROUTE}>Already registered? login here</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
