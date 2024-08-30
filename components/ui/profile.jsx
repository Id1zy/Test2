import React, { useEffect, useState } from 'react';

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user'); // Llama a tu API
        const data = await res.json();

        if (data.success && data.data.length > 0) {
          setUser(data.data[0]); // Usa el primer usuario de la respuesta
        } else {
          console.error('No se encontraron usuarios');
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga
  }

  if (!user) {
    return <div>No se encontró ningún usuario</div>; // Muestra un mensaje si no se encontró usuario
  }

  return (
    <div className="h-full">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">Admin Profile</span>
            <a href="#" className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">
              Edit
            </a>
          </div>
          <span className="text-gray-600"></span>
          <div className="w-full p-8 mx-2 flex justify-center">
            <img
              id="showImage"
              className="max-w-xs w-32 items-center border"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="rounded shadow p-6">
            <div className="pb-6">
              <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">
                Name
              </label>
              <div className="flex">
                <input
                  disabled
                  id="username"
                  className="border-1 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={user.nombre} // Usa el nombre del usuario
                />
              </div>
            </div>
            <div className="pb-4">
              <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">
                Email
              </label>
              <input
                disabled
                id="email"
                className="border-1 rounded-r px-4 py-2 w-full"
                type="email"
                value={user.email} // Usa el email del usuario
              />
              <span className="text-gray-600 pt-4 block opacity-70">Personal login information of your account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}