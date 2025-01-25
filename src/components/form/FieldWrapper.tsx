import { Field, FieldProps } from "formik";

interface FieldWrapperProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  error: string;
  touched: boolean;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  error,
  touched,
}) => {
  return (
    <div className="relative">
      <Field name={name}>
        {({ field }: FieldProps) => (
          <>
            <input
              {...field}
              id={id}
              type={type}
              placeholder={placeholder}
              className="peer placeholder-transparent h-10 w-full border-b-2 bg-white text-gray-900 focus:outline-none focus:border-rose-600 border-gray-300"
            />
            <label
              htmlFor={id}
              className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              {label}
            </label>
            {error && touched && (
              <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
          </>
        )}
      </Field>
    </div>
  );
};
