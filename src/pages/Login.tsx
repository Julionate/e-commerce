import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const filteredValue = value.trim();

    setFormData({
      ...formData,
      [name]: filteredValue,
    });
  };

  const validate = (values: FormValues) => {
    const errors: FormErrors = {};

    if (values.email === '') {
      errors.email = 'Ingrese un correo.';
    }

    if (values.password === '') {
      errors.password = 'Ingrese una contraseña';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(validate(formData)).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem('token', response.data.token);
        setMessage({ status: 200, message: 'Inicio de sesión exitoso' });
        window.location.href = '/';
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setMessage({
            status: err.response.status,
            message: err.response.data.message,
          });
        } else {
          setError('Error de red');
        }
      }
    }
  };

  return (
    <div className="flex w-full flex-grow items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative flex max-h-[920px] min-h-96 w-3/4 max-w-96 flex-col items-center justify-center gap-2 rounded-xl border-black/5 bg-slate-50/10 p-10 shadow-md dark:border-white/5 dark:bg-slate-800 dark:shadow-white/5"
      >
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Iniciar Sesión</h1>
        <label className="w-4/5">
          <input
            placeholder="Correo"
            name="email"
            type="email"
            onChange={handleChange}
            className="dark:shadow-white/5m h-8 w-full rounded-md bg-slate-50 p-2 shadow-sm outline-none placeholder:text-slate-400 focus:bg-slate-100 dark:bg-slate-700 dark:text-white dark:focus:bg-slate-600"
          />
          {formErrors.email && (
            <p className="ml-2 text-red-400">{formErrors.email}</p>
          )}
        </label>
        <label className="w-4/5">
          <input
            placeholder="Contraseña"
            name="password"
            type="password"
            onChange={handleChange}
            className="h-8 w-full rounded-md bg-slate-50 p-2 shadow-sm outline-none placeholder:text-slate-400 focus:bg-slate-100 dark:bg-slate-700 dark:text-white dark:shadow-white/5 dark:focus:bg-slate-600"
          />
          {formErrors.password && (
            <p className="ml-2 text-red-400">{formErrors.password}</p>
          )}
        </label>
        {message ? (
          <span
            className={`-mb-4 text-center font-semibold ${message.status === 200 ? 'text-blue-400' : 'text-red-400'}`}
          >
            {message.message}
          </span>
        ) : null}
        <button
          className="mt-4 h-10 w-24 rounded-md bg-sky-400 font-semibold text-white hover:bg-sky-500 dark:text-white"
          type="submit"
        >
          Ingresar
        </button>
        <Link
          to={'/register'}
          className="mt-6 text-center text-gray-800 dark:text-gray-100"
        >
          Cree una cuenta aquí
        </Link>
        <a
          href="https://tailwindcss.com/docs/box-decoration-break"
          className="absolute bottom-2 text-xs text-black/50 sm:text-base dark:text-white/50"
        >
          Recuperar Contraseña
        </a>
      </form>
    </div>
  );
}
