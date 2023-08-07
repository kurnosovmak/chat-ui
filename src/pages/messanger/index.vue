<template>
  <div class="flex-grow flex flex-row min-h-0 w-full h-[100vh]">
    <div class="text-gray-800 shadow px-2 pt-4 bg-white w-full lg:w-[300px] relative max-h-screen overflow-hidden">
      <!--      Header messeger -->
      <div class="w-[calc(100vw-16px)] lg:w-[284px] bg-white z-10 fixed max-w-[inherit] py-1">
        <div class="flex flex-row w-full justify-between gap-2 ">
          <div>
            <select class="text-xs bg-transparent cursor-pointer">
              <option value="0">Все</option>
              <option value="0">Чаты</option>
              <option value="0">Каналы</option>
              <option value="0">Личные переписки</option>
            </select>
          </div>
          <button
              class="text-black rounded hover:bg-gray-200 bg-gray-100 w-10 h-8 p-2 md:block">
            <svg viewBox="0 0 24 24" class="w-full h-full fill-current">
              <path
                  d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="h-[calc(100vh-24px-46px)] lg:h-[calc(100vh-24px)] overflow-y-auto scrollbar pt-12">
        <div class="flex flex-col ">
        <!--        поиск -->
        <div class="h-8 flex flex-row justify-center items-center gap-1.5 mb-2 rounded bg-gray-100 px-1.5">
          <span class="inline-block">
              <svg viewBox="0 0 24 24" class="w-4 h-4">
                  <path class="fill-gray-500"
                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
              </svg>
            </span>
          <input class="block rounded px-1 flex-1 bg-transparent placeholder-gray-500"
                 placeholder="поиск"
                 type="text">
        </div>

        <!--        Чаты каналы и личные переписки-->
        <div
            class="flex flex-row p-1 gap-1.5 h-12 cursor-pointer w-full hover:bg-gray-100 items-center rounded justify-between">
          <img src="https://i.postimg.cc/qRtfTBGs/RIAKyt3-E-3o.jpg" alt=""
               class="rounded-full h-9 w-9">
          <div class="flex flex-col justify-between flex-1">
            <span></span>
            <span class="text-sm">Александр Курносов</span>
            <span class="text-xs opacity-40">Личная переписка</span>
          </div>
          <div>
            <!--            <div class="rounded-full px-1.5 py-0.5 bg-orange-500 text-white text-xs">1</div>-->
          </div>
        </div>
        <div
            class="flex flex-row p-1 gap-1.5 h-12 cursor-pointer w-full hover:bg-gray-100 items-center rounded justify-between">
          <img src="https://i.postimg.cc/qRtfTBGs/RIAKyt3-E-3o.jpg" alt=""
               class="rounded-full h-9 w-9">
          <div class="flex flex-col justify-between flex-1">
            <span></span>
            <span class="text-sm">Александр Курносов</span>
            <span class="text-xs opacity-40">Личная переписка</span>
          </div>
          <div>
            <div class="rounded-full px-1.5 py-0.5 bg-orange-500 text-white text-xs">1</div>
          </div>
        </div>
        <div
            class="flex flex-row p-1 gap-1.5 h-12 cursor-pointer w-full hover:bg-gray-100 items-center rounded justify-between">
          <img src="https://i.postimg.cc/qRtfTBGs/RIAKyt3-E-3o.jpg" alt=""
               class="rounded-full h-9 w-9">
          <div class="flex flex-col justify-between flex-1">
            <span></span>
            <span class="text-sm">Александр Курносов</span>
            <span class="text-xs opacity-40">Личная переписка</span>
          </div>
          <div>
            <!--            <div class="rounded-full px-1.5 py-0.5 bg-orange-500 text-white text-xs">1</div>-->
          </div>
        </div>
        <div
            v-for="v in 2" :key="v"
            class="flex flex-row p-1 gap-1.5 h-12 cursor-pointer w-full hover:bg-gray-100 items-center rounded justify-between">
          <img src="https://i.postimg.cc/t4TG5zVv/facebook-messenger-logo-1.webp" alt=""
               class="rounded-full h-9 w-9 object-cover">
          <div class="flex flex-col justify-between flex-1">
            <span></span>
            <span class="text-sm">Мессенджер team backend</span>
            <span class="flex flex-row gap-1 items-center">
              <span class="text-xs opacity-40">Чат </span>
              <span class="text-xs px-1 rounded-full bg-blue-400 text-white">Скрытый</span>
            </span>
          </div>
          <div>
            <div class="rounded-full px-1.5 py-0.5 bg-orange-500 text-white text-xs">12</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* can be configured in tailwind.config.js */
.group:hover .group-hover\:block {
  display: block;
}

.hover\:w-64:hover {
  width: 45%;
}


/* NO NEED THIS CSS - just for custom scrollbar which can also be configured in tailwind.config.js*/
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-thumb {
  background: #2d3748;
  border: 0px none #ffffff;
  border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2b6cb0;
}

::-webkit-scrollbar-thumb:active {
  background: #000000;
}

::-webkit-scrollbar-track {
  background: #1a202c;
  border: 0px none #ffffff;
  border-radius: 50px;
}

::-webkit-scrollbar-track:hover {
  background: #666666;
}

::-webkit-scrollbar-track:active {
  background: #333333;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

</style>
<script setup>
</script>