import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { object as yobject, string as ystring, ref as yref } from "yup";
import { LOGIN_ROUTE } from "../../router/routerPath";
import { api } from "../../api/interceptor";
import { AUTH_REGISTER_POST } from "../../api/endpoints";
import { useState } from "react";
import { FieldWrapper } from "../form/FieldWrapper";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const handleSubmit = async ({ username, email, password }: SubmitValues) => {
    try {
      setIsLoading(true);
      await api.post(AUTH_REGISTER_POST, {
        username,
        email,
        password,
      });
      setIsLoading(false);
      navigation(LOGIN_ROUTE);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const initValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
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
              {({ errors, touched, isValid }) => (
                <Form className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <FieldWrapper
                      id="username"
                      name="username"
                      type="text"
                      label="Username"
                      placeholder="Username"
                      error={errors.username || ""}
                      touched={touched.username || false}
                    />

                    <FieldWrapper
                      id="email"
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      error={errors.email || ""}
                      touched={touched.email || false}
                    />

                    <FieldWrapper
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      error={errors.password || ""}
                      touched={touched.password || false}
                    />

                    <FieldWrapper
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      error={errors.confirmPassword || ""}
                      touched={touched.confirmPassword || false}
                    />

                    <div className="relative">
                      <button
                        type="submit"
                        className={`${
                          !isValid ? "bg-cyan-200" : "bg-cyan-500"
                        } text-white font-bold rounded-md px-2 py-1 w-full`}
                        disabled={!isValid || isLoading}
                      >
                        {isLoading ? "Please wait..." : "Register"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="w-full mx-auto justify-center mt-6">
              <Link
                to={LOGIN_ROUTE}
                className="block text-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Already registered? Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
