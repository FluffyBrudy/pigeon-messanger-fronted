import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { object as yobject, string as ystring } from "yup";
import { REGISTER_ROUTE } from "../../router/routerPath";
import { api } from "../../api/interceptor";
import { LOGIN_ENDPOINT } from "../../api/endpoints";

interface SubmitValues {
  email: string;
  password: string;
}

const LoginSchema = yobject().shape({
  email: ystring().email("Email is invalid").required("Email is required"),
  password: ystring()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .required("Password is required"),
});

const Login = () => {
  const handleSubmit = ({ email, password }: SubmitValues) => {
    console.log(email, password);
    api
      .post(LOGIN_ENDPOINT, { email, password })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const initValues = { email: "", password: "" };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-[min(700px,97vw)] sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <Formik
              initialValues={{ ...initValues }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
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
                      <button
                        type="submit"
                        className="bg-cyan-500 text-white rounded-md w-full block px-2 py-1"
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
                <Link to={REGISTER_ROUTE}>Not registered? register here</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
