import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

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

    if (values.username === '') {
      errors.username = 'Ingrese un usuario.';
    } else if (!usernameRegex.test(values.username)) {
      errors.username =
        'No se permiten caracteres especiales, espacios, ni números.';
    }

    if (values.password === '') {
      errors.password = 'Ingrese una contraseña';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(validate(formData)).length === 0) {
      console.log('Formulario enviado:', formData);
    }
  };

  return (
    <div className="w-full flex-grow flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2 relative bg-slate-50/10 dark:bg-slate-800 dark:border-white/5 border-black/5 shadow-md dark:shadow-white/5 w-3/4 min-h-96 max-h-[920px] max-w-96 rounded-xl p-10"
      >
        <h1 className="font-bold text-2xl sm:text-3xl mb-6">Iniciar Sesión</h1>
        <label className="w-4/5">
          <input
            placeholder="Usuario"
            name="username"
            type="text"
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-700 dark:text-white h-8 p-2 placeholder:text-slate-400 outline-none rounded-md shadow-sm dark:shadow-white/5m focus:bg-slate-100 dark:focus:bg-slate-600"
          />
          {formErrors.username && (
            <p className="text-red-400 ml-2">{formErrors.username}</p>
          )}
        </label>
        <label className="w-4/5">
          <input
            placeholder="Contraseña"
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-700 dark:text-white h-8 p-2 placeholder:text-slate-400 outline-none rounded-md shadow-sm dark:shadow-white/5 focus:bg-slate-100 dark:focus:bg-slate-600"
          />
          {formErrors.password && (
            <p className="text-red-400 ml-2">{formErrors.password}</p>
          )}
        </label>
        <button
          className="w-24 h-10 bg-sky-400 hover:bg-sky-500 dark:text-white text-white rounded-md font-semibold mt-6"
          type="submit"
        >
          Ingresar
        </button>
        <Link
          to={'/register'}
          className="text-gray-800 dark:text-gray-100 mt-6 text-center"
        >
          Cree una cuenta aquí
        </Link>
        <a
          href="https://tailwindcss.com/docs/box-decoration-break"
          className="absolute bottom-2 text-xs sm:text-base text-black/50 dark:text-white/50"
        >
          Recuperar Contraseña
        </a>
      </form>
    </div>
  );
}
