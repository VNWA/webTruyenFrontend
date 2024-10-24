<template>
  <div>

    <Title>Truyện tranh mới nhất </Title>
    <Meta name="title" content="Truyện tranh mới nhất  " />
    <Meta name="og:title" content="Truyện tranh mới nhất  " />

    <NuxtLayout>
        <div v-if="!data">
          loading. ...
        </div>
        <div v-else>
          <div >
            <Slide :data="highlightProducts" />
          </div>
          <div class="mt-5 mb-14">
            <div class="flex items-center justify-between mb-3">
              <div>
                <CateTittle class="mb-3">Truyện mới nổi bật</CateTittle>
              </div>
            </div>
            <div class="w-full grid lg:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
              <div class="col-span-1" v-for="item in newProducts">
                <NuxtLink :to="'/truyen/' + item.slug">
                  <ItemProductNormal :dataProduct="item" />
                </NuxtLink>
              </div>
            </div>
          </div>
         
        </div>


      <!-- <template #topRatingProduct>

        <TopRatingProduct v-if=" data && data.dataTopProduct.length>0" :data="data.dataTopProduct" />
      </template> -->


    </NuxtLayout>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const highlightProducts = ref([])
const newProducts = ref([])


const response = await fetch(config.public.apiBase + '/get-data-home');
const data = await response.json();
if (response.ok) {
  highlightProducts.value = data.highlightProducts
  newProducts.value = data.newProducts
} else {
  console.error(response)
}


</script>

<style></style>