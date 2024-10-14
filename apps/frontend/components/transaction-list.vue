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

const config = useRuntimeConfig()

const {wallet} = defineProps({
  wallet: {
    type: String,
    required: true,
  },
});

const page = ref(0) // default page to start from
const limit = ref(10) // the page size
const error = ref()
const isFetching = ref<boolean>(false)
const data = ref({data: [], total: 0, page: page.value, limit: limit.value})


import { useInfiniteScroll } from '@vueuse/core'

const fetchTransactions = async (isRetry = false) => {
  // Only increment to next page if it is not a retry to avoid fetching duplicate
  const nextPage = isRetry ? page.value : page.value+1
  const url = `${config.public.apiHost}/transactions`
  const hasMoreData = data.value.total == 0 || data.value.total > nextPage * limit.value
  if (hasMoreData) {
    // drops the risk of overfetching if this function is called twice for 
    // new data request
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
    // Only fetch new data if there are no pending data to be fetched.
    if (!isFetching.value) {
        await fetchTransactions()
    }
  },
  { distance: 100 }
)
</script>

<style scoped>
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