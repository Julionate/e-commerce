import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    const usernameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (values.username === '') {
      errors.username = 'Ingrese un usuario.';
    } else if (!usernameRegex.test(values.username)) {
      errors.username =
        'No se permiten caracteres especiales, espacios, ni números.';
    }

    if (values.email === '') {
      errors.email = 'Por favor ingrese un correo.';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Email no válido.';
    }

    if (values.password === '') {
      errors.password = 'Ingrese una contraseña';
    }

    if (values.passwordConfirm === '') {
      errors.passwordConfirm = 'Confirme su contraseña.';
    } else if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Las contraseñas no son idénticas.';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(validate(formData)).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:3000/auth/register',
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
        );
        setMessage({ status: 200, message: 'Registro exitoso, inicie sesión' });
        setTimeout(() => {
          navigate('/login');
        }, 900);
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
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Registrarse</h1>
        <label className="w-4/5">
          <input
            placeholder="Usuario"
            name="username"
            type="text"
            onChange={handleChange}
            className="dark:shadow-white/5m h-8 w-full rounded-md bg-slate-50 p-2 shadow-sm outline-none placeholder:text-slate-400 focus:bg-slate-100 dark:bg-slate-700 dark:text-white dark:focus:bg-slate-600"
          />
          {formErrors.username && (
            <p className="ml-2 text-red-400">{formErrors.username}</p>
          )}
        </label>
        <label className="w-4/5">
          <input
            placeholder="Correo electrónico"
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
        <label className="w-4/5">
          <input
            placeholder="Confirmar contraseña"
            name="passwordConfirm"
            type="password"
            onChange={handleChange}
            className="h-8 w-full rounded-md bg-slate-50 p-2 shadow-sm outline-none placeholder:text-slate-400 focus:bg-slate-100 dark:bg-slate-700 dark:text-white dark:shadow-white/5 dark:focus:bg-slate-600"
          />
          {formErrors.passwordConfirm && (
            <p className="ml-2 text-red-400">{formErrors.passwordConfirm}</p>
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
          className="mt-6 h-10 w-24 rounded-md bg-sky-400 font-semibold text-white hover:bg-sky-400 dark:text-white"
          type="submit"
        >
          Registrarse{' '}
        </button>
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
