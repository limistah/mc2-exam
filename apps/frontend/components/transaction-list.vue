<template>
  <div class="h-full p-8">
    <div class="text-3xl font-semibold">Latest Transactions</div>
    <div  ref="el" class="h-full overflow-scroll py-3 px-2 grid grid-cols-1 gap-4">
        <!-- Render the transaction items -->
      <div v-for="item in data.data" v-bind:key="item.timestamp" >
        <TransactionItem :item="item" />
      </div>
      <!-- In any case there is an error, render this nice component, leave room for retry -->
      <div v-if="error" class="text-red-600 text-sm text-center p-3">
        An error occurred while fetching your transactions <button v-on:click="handleRetry">Retry</button>
      </div>
      <!-- Loading component to show status of api request -->
      <div v-if="!error && isFetching" class="flex items-center justify-center p-3" >
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
const {wallet} = useRoute().query
const config = useRuntimeConfig()
const page = ref(0)
const limit = ref(10)
const error = ref()
const isFetching = ref<boolean>(false)
const data = ref({data: [], total: 0, page: page.value, limit: limit.value})


import { useInfiniteScroll } from '@vueuse/core'

const fetchTransactions = async (isRetry = false) => {
    const nextPage = isRetry ? page.value : page.value+1
    const url = `${config.public.apiHost}/transactions`
    const hasMoreData = data.value.total == 0 || data.value.total > nextPage * limit.value
    if (hasMoreData) {
        isFetching.value = true
        page.value = nextPage
        const { data:d, error: e } = await useLazyFetch(url, {
            server: true,
            query: {
              wallet: wallet,
              limit: limit,
              page: page
            }
        });
        error.value = e.value
        console.log(d.value.data[0])
        data.value.data.push(...d.value.data)
        data.value.page = page
        data.value.total = d.value.total
        isFetching.value = false
    }
}

const handleRetry = async () => fetchTransactions(true);

const el = ref<HTMLElement | null>(null)
useInfiniteScroll(
  el,
  async () => {
    console.log("hello")
    
    if (!isFetching.value) {
        await fetchTransactions()
    }
  },
  { distance: 100 }
)
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid;
  border-color: #000 #0000;
  animation: l1 1s infinite;
}
@keyframes l1 {to{transform: rotate(.5turn)}}
</style>