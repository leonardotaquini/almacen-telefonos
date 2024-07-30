import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiMarketo } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import { CheckoutFormI } from '../interfaces/cart.interfaces';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';
import { sendMessage } from '../helpers/sendMessage';

// Define las provincias y sus respectivas localidades con códigos postales
const data = {
  Chaco: {
    cities: [
      { name: 'Resistencia', postalCode: '3500' },
      { name: 'Villa Berthet', postalCode: '3545' },
      { name: 'Sáenz Peña', postalCode: '3700' },
      { name: 'Villa Ángela', postalCode: '3540' },
      { name: 'Barranqueras', postalCode: '3503' },
    ],
  },
  Formosa: {
    cities: [
      { name: 'Formosa', postalCode: '3600' },
      { name: 'Clorinda', postalCode: '3610' },
      { name: 'Pirané', postalCode: '3606' },
      { name: 'El Colorado', postalCode: '3608' },
    ],
  },
};

export const CheckoutForm = () => {

  const navigate = useNavigate();
  const { clearCart, cartItems } = useContext(CartContext);
  const { register, reset, formState: { errors }, handleSubmit, setValue } = useForm<CheckoutFormI>();

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState<{ name: string; postalCode: string }[]>([]);
  const [postalCode, setPostalCode] = useState('');

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const province = event.target.value;
    setSelectedProvince(province);
    const provinceData = data[province as keyof typeof data];
    setCities(provinceData ? provinceData.cities : []);
    setSelectedCity('');
    setPostalCode('');
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    const cityData = cities.find((c) => c.name === city);
    setPostalCode(cityData ? cityData.postalCode : '');
    setValue('zip', cityData ? cityData.postalCode : '');
  };

  const onSubmit = (data: CheckoutFormI) => {
    sendMessage(cartItems, data);
    reset();
    Swal.fire({
      title: 'Pedido realizado',
      text: 'Tu pedido fue realizado con éxito',
      titleText: 'Gracias por tu compra',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
    clearCart();
    navigate('/');
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="flex justify-center items-center">
            <SiMarketo className="text-4xl" />
            <h1 className="text-4xl logo-tech mx-2 text-indigo-600">
              Mercado-Tech
            </h1>
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-lg font-bold sm:text-2xl">
              Último paso para realizar tu pedido
            </h3>
            <p className="py-2">¡Completá los datos para el envío!</p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" autoComplete='off'>
            <div>
              <label className="font-medium">Nombre y Apellido</label>
              <input
                type="text"
                placeholder="Ej: Juan Perez"
                {...register('name', { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.name && <span className="text-red-500">El nombre es requerido</span>}
            </div>

            <div>
              <label className="font-medium">E-mail</label>
              <input
                type="email"
                placeholder="usuario@gmail.com"
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'El email no es válido'
                  }
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div>
              <label className="font-medium">WhatsApp</label>
              <input
                type="text"
                placeholder="3704123456"
                {...register('whatsapp', {
                  required: true,
                  pattern: {
                    value: /^(?:\+?54)?(?:11|[2368]\d)\d{8}$/,
                    message: 'El número de WhatsApp no es válido'
                  }
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.whatsapp && <span className="text-red-500">{errors.whatsapp.message}</span>}
            </div>

            <div>
              <label className="font-medium">DNI</label>
              <input
                type="text"
                placeholder='11222333'
                {...register('dni', {
                  required: true,
                  pattern: {
                    value: /^\d{7,8}$/,
                    message: 'El formato del DNI es invalido.'
                  }
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.dni && <span className="text-red-500">{errors.dni.message}</span>}
            </div>

            <div>
              <label className="font-medium">Provincia</label>
              <select
                value={selectedProvince}
                {...register('province', {
                  required: true,
                  onChange: handleProvinceChange
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              >
                <option value="">Selecciona una provincia</option>
                <option value="Chaco">Chaco</option>
                <option value="Formosa">Formosa</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Localidad / Ciudad</label>
              <select
                value={selectedCity}
                {...register('city', {
                  required: true,
                  onChange: handleCityChange
                })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                disabled={!selectedProvince}
              >
                <option value="">Selecciona una localidad / ciudad</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-medium">Código Postal</label>
              <input
                type="text"
                value={postalCode}
                readOnly
                {...register('zip', { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.zip && <span className="text-red-500">El código postal es requerido</span>}
            </div>

            <div>
              <label className="font-medium">Dirección</label>
              <input
                type="text"
                placeholder="Calle 123"
                {...register('address', { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.address && <span className="text-red-500">La dirección es requerida</span>}
            </div>

            <div>
              <label className="font-medium">Método de pago</label>
              <select
                {...register('pay_method', { required: true })}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              >
                <option value="">Selecciona un método de pago</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
              {errors.pay_method && <span className="text-red-500">El método de pago es requerido</span>}
            </div>
                <div>
              <label className="font-medium">¿Quién te recomendó la tienda?</label>
              <select 
                  className='w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                  {...register('seller', { required: true })}
                  >
                  <option value="">Selecciona una opción</option>
                  <option value="Carolina">Carolina</option>
                  <option value="Jessica">Jessica</option>
                  <option value="Ninguna">Otro</option>
              </select>
              {errors.seller && <span className="text-red-500">Este campo es requerido</span>}
                </div>

            <Link to='/cart'>
              <button className="w-full px-4 py-2 mt-4 text-white font-medium bg-zinc-900 hover:bg-zinc-700 active:bg-indigo-600 rounded-lg duration-150">
                Volver al carrito
              </button>
            </Link>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Enviar pedido
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
