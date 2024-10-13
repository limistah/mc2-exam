<template>
    <div class="border-b border-solid border-gray-300">
        <div class="flex items-center pb-2">
            <div class="pr-1">
                <img
                src="https://metacore.mobula.io/60989b438a473ed77703f7bcd3530fc15542996a6607ae831de8c5e3e10f688d.png"
                width="30"
                height="30"
                class="rounded"
              />
            </div>
            <div>
                <ClarityTwoWayArrowsLine />
            </div>
            <div class="pl-2">
              <img
                :src="item.asset.logo"
                width="30"
                height="30"
                class="rounded"
              />
            </div>
            <div class="pl-2 text-lg font-semibold">
                <span>ETH</span>
                <span>{{ item.asset.symbol }}</span>
            </div>
        </div>
        <div class="flex justify-between items-center text-sm sm:text-base">
            <div class="w-2/5">
                <div class="text-gray-400">Spent Amount</div>
                <div>{{parseFloat(item.tx_cost || 0.00).toFixed(7)}} ETH</div>
            </div>
            <div class="w-1/6 flex justify-between items-center flex-col">
                <ClarityTwoWayArrowsLine />
            </div>
            <div class=" w-2/5 flex items-start flex-col">
                <div class="text-gray-400">Received Amount</div>
                <div class="">{{ parseFloat(item.amount).toFixed(7) }} {{ item.asset.symbol }}</div>
            </div>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const { item } = props;
</script>