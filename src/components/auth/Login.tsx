import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { object as yobject, string as ystring } from "yup";
import { HOME_ROUTE, REGISTER_ROUTE } from "../../router/routerPath";
import { api } from "../../api/interceptor";
import { AUTH_LOGIN_POST, PREF_PROFILE_IMAGE_POST } from "../../api/endpoints";
import { useRef, useState } from "react";
import { FieldWrapper } from "../form/FieldWrapper";
import { ACCESS_TOKEN } from "../../api/constants";
import { useAuthStore } from "../../store/authStore";
import { EyeClosed, EyeIcon } from "lucide-react";
import { LoginData } from "../../types/user";
import { renderToStaticMarkup } from "react-dom/server";
import { uploadImageFromBlobUrl } from "../../service/preferences";
import Avatar from "../common/Avatar";
import { AxiosResponse } from "axios";
import { IAuthStoreValues } from "../../types/store";

interface ISubmitValues {
  email: string;
  password: string;
}

type UserData = Omit<IAuthStoreValues, "isAuthenticated">;

const LoginSchema = yobject().shape({
  email: ystring().email("Email is invalid").required("Email is required"),
  password: ystring()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigation = useNavigate();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUserData = useAuthStore((state) => state.setUserData);
  const userData = useRef<UserData | null>(null);
  const guestUser = useRef({
    email: "apple@gmail.com",
    password: "Applefruit#12",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((state) => !state);
  };

  const handleSubmit = async ({ email, password }: ISubmitValues) => {
    setLoginError("");
    setShowPassword(false);
    setIsLoading(true);
    localStorage.removeItem(ACCESS_TOKEN);
    let needUpdate = false;
    let username_ = "";

    try {
      const res = await api.post(AUTH_LOGIN_POST, { email, password });
      const { username, initialized, id, accessToken, imageUrl } = res.data
        .data as LoginData;
      console.log(initialized);
      userData.current = {
        username,
        imageUrl,
        isProfileInitialized: initialized,
        userId: id,
      };

      setIsLoading(false);

      if (res.status === 200) {
        needUpdate = !initialized;
        username_ = username;
        setAuthenticated(true);
        setUserData(userData.current);
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem("id", id);
        navigation(HOME_ROUTE);
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        (err as Error).message || (err as AxiosResponse).data.error;
      setLoginError(errorMessage || "Failed to login");
      setIsLoading(false);
      setAuthenticated(false);
    }
    if (needUpdate) {
      const staticHtmlString = renderToStaticMarkup(
        <Avatar name={username_} />
      );
      try {
        const imageUrl = await uploadImageFromBlobUrl(staticHtmlString);
        const uploadRes = await api.post(PREF_PROFILE_IMAGE_POST, { imageUrl });
        if (uploadRes.data.imageUrl)
          setUserData({ imageUrl: uploadRes.data.imageUrl });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 w-[min(700px,97vw)] sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto relative">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="font-bold absolute top-1 left-[50%] translate-x-[-50%] text-red-800">
              <p>{loginError}</p>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValid }) => (
                <Form className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <FieldWrapper
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      error={errors.email || ""}
                      touched={touched.email || false}
                    />
                    <div className="relative">
                      <FieldWrapper
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password || ""}
                        touched={touched.password || false}
                      />
                      {showPassword ? (
                        <EyeIcon
                          onClick={togglePasswordVisibility}
                          className="absolute right-0 top-0"
                        />
                      ) : (
                        <EyeClosed
                          onClick={togglePasswordVisibility}
                          className="absolute right-0 top-0"
                        />
                      )}
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className={`${
                          !isValid ? "bg-cyan-200" : "bg-cyan-500"
                        } text-white font-bold rounded-md px-2 py-1 w-full`}
                        disabled={!isValid || isLoading}
                      >
                        {isLoading ? "Please wait..." : "Login"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <button
              onClick={() => handleSubmit({ ...guestUser.current })}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-cyan-200" : "bg-cyan-500"
              } text-white font-bold rounded-md px-2 py-1 w-full`}
            >
              Join as guest user
            </button>
            <div className="w-full flex justify-center mt-6">
              <Link
                to={REGISTER_ROUTE}
                className="block text-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Not registered? Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
