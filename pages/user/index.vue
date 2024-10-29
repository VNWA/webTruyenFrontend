<template>
  <div>
    <UserPanel>

      <div class="bg-gray-50 w-full border">
        <div class="p-8">
          <h1 class="text-3xl text-center font-medium border-b pb-4 mb-5">Cambio de contraseña
          </h1>
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-2 gap-8">
              <div>
                <label for="nombre" class="text-sm">Nombre <span class="text-primary">*</span></label>
                <input id="nombre" type="text" class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3"
                  required />
              </div>
              <div>
                <label for="apellido" class="text-sm">Apellido <span class="text-primary">*</span></label>
                <input id="apellido" type="text"
                  class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3" required />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8 my-2">
              <div>
                <label for="empresa" class="text-sm">Empresa <span class="text-primary">*</span></label>
                <input id="empresa" type="text" class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3"
                  required />
              </div>
              <div>
                <label for="codigoPostal" class="text-sm">Código postal <span class="text-primary">*</span></label>
                <input id="codigoPostal" type="text"
                  class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3" required />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8 my-2">
              <div>
                <label for="calle" class="text-sm">Calle <span class="text-primary">*</span></label>
                <input id="calle" type="text" class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3"
                  required />
              </div>
              <div>
                <label for="numeroCasa" class="text-sm">Número de casa <span class="text-primary">*</span></label>
                <input id="numeroCasa" type="text"
                  class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3" required />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8">
              <div>
                <div class="uppercase underline text-gray-500 text-xs">IMPORTANTE</div>
                <div class="text-gray-500 text-xs">
                  En la medida de lo posible, por favor, utiliza las abreviaturas: calle: c.; c/; cl.; avenida: av.;
                  avd.; avda.; paseo: p.º; plaza: pza.; pl.; plza.
                </div>
              </div>
              <div>
                <div class="uppercase underline text-gray-500 text-xs">IMPORTANTE</div>
                <div class="text-gray-500 text-xs">
                  En la medida de lo posible, por favor, utiliza las abreviaturas: calle: c.; c/; cl.; avenida: av.;
                  avd.; avda.; paseo: p.º; plaza: pza.; pl.; plza.
                </div>
                <div class="flex items-center gap-2 py-4">
                  <label class="flex items-center cursor-pointer">
                    <input type="checkbox" class="hidden peer" />
                    <div
                      class="w-6 h-6 border border-gray-300 rounded-sm transition-all duration-300 peer-checked:bg-primary flex items-center justify-center">
                      <svg class="w-4 h-4 text-white opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12l5 5L20 7"></path>
                      </svg>
                    </div>
                  </label>
                  <p class="text-xs">Ningún número de casa disponible</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8 my-2">
              <div>
                <label for="ciudad" class="text-sm">Ciudad <span class="text-primary">*</span></label>
                <input id="ciudad" type="text" class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3"
                  required />
              </div>
              <div>
                <label for="telefono" class="text-sm">Teléfono<span class="text-primary">*</span></label>
                <input id="telefono" type="text"
                  class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3" required />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8 my-2">
              <div>
                <label for="email" class="text-sm">E-mail <span class="text-primary">*</span></label>
                <input id="email" type="email" class="pl-3 border focus:border-gray-400 focus:outline-none w-full py-3"
                  required />
              </div>
              <div></div>
            </div>
            <div class="my-2 flex gap-4">
              <label class="cursor-pointer">
                <input type="checkbox" class="hidden peer" />
                <div
                  class="w-6 h-6 border border-gray-300 rounded-sm transition-all duration-300 peer-checked:bg-primary flex items-center justify-center">
                  <svg class="w-4 h-4 text-white opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12l5 5L20 7"></path>
                  </svg>
                </div>
              </label>
              <div>
                <p class="pb-2 text-sm">Doy mi consentimiento para enviar por Cosmo Group Sp. z o.o. a la dirección de
                  correo electrónico proporcionada, mensajes comerciales, incluido un boletín informativo, que
                  contiene información sobre productos y servicios ofrecidos por.</p>
                <p class="text-sm">El consentimiento precitado es completamente voluntario y al expresarlo, confirmas
                  que has consultado la Política de privacidad y aceptas que tus datos personales sean procesados por
                  Cosmo Group Sp. z o.o. según los términos establecidos en la Política de privacidad. Puedes retirar
                  tu consentimiento en cualquier momento haciendo clic en el enlace contenido en los mensajes
                  comerciales enviados.</p>
              </div>
            </div>
            <div class="my-4">

            </div>
            <div class="my-2 flex justify-end">
              <button type="submit" class="bg-primary text-white py-4 px-3 hover:bg-rose-300 duration-300">Guardar
                cambios</button>
            </div>

          </form>
        </div>
      </div>
    </UserPanel>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});
const handleSubmit = () => {
};
</script>
