import HorizontalCard from '../components/HorizontalCard';

export default function Cart() {
  const handleCheckout = () => {};

  return (
    <>
      <h1 className="text-3xl font-semibold ml-2">Productos</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] p-2">
        <div className="w-full flex flex-col gap-2">
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhasdbhjd"
          />
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhsadbhjasdbhjsadhbjsabhjasdhbjsadnjhksadnjkhsadnjksadbhjhbuasbhasbhuasdbhuasdbhjadsbhjasdhbjasdbhjasdbhjasdbhjd"
          />
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhsadbhjasdbhjsadhbjsabhjasdhbjsadnjhksadnjkhsadnjksadbhjhbuasbhasbhuasdbhuasdbhjadsbhjasdhbjasdbhjasdbhjasdbhjd"
          />
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhsadbhjasdbhjsadhbjsabhjasdhbjsadnjhksadnjkhsadnjksadbhjhbuasbhasbhuasdbhuasdbhjadsbhjasdhbjasdbhjasdbhjasdbhjd"
          />
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhsadbhjasdbhjsadhbjsabhjasdhbjsadnjhksadnjkhsadnjksadbhjhbuasbhasbhuasdbhuasdbhjadsbhjasdhbjasdbhjasdbhjasdbhjd"
          />
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhsadbhjasdbhjsadhbjsabhjasdhbjsadnjhksadnjkhsadnjksadbhjhbuasbhasbhuasdbhuasdbhjadsbhjasdhbjasdbhjasdbhjasdbhjd"
          />
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhsadbhjasdbhjsadhbjsabhjasdhbjsadnjhksadnjkhsadnjksadbhjhbuasbhasbhuasdbhuasdbhjadsbhjasdhbjasdbhjasdbhjasdbhjd"
          />
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhsadbhjasdbhjsadhbjsabhjasdhbjsadnjhksadnjkhsadnjksadbhjhbuasbhasbhuasdbhuasdbhjadsbhjasdhbjasdbhjasdbhjasdbhjd"
          />
          <HorizontalCard
            img="1358307.jpeg"
            price="1.128.990"
            product="assabhsadbhjasdbhjsadhbjsabhjasdhbjsadnjhksadnjkhsadnjksadbhjhbuasbhasbhuasdbhuasdbhjadsbhjasdhbjasdbhjasdbhjasdbhjd"
          />
        </div>
        <div className="w-full flex justify-center pl-6 pr-6">
          <div className="w-full h-max bg-slate-50/5 shadow-sm dark:shadow-white/5 dark:bg-slate-800 p-6 flex flex-col justify-center items-center rounded-md ">
            <span className="text-xl font-semibold text-center">
              Información del carrito
            </span>
            <span className="text-base">Seleccionados 2 productos</span>
            <span className="text-base">Monto total: $250.000</span>
            <button
              onClick={handleCheckout}
              className="bg-sky-400 w-max pr-3 pl-3 h-8 rounded-md hover:bg-sky-500 font-semibold mt-6 shadow-sm text-white"
            >
              Ir al pago
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
