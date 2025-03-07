<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-gray-500 text-sm font-medium">{{ title }}</h3>
    <div class="flex items-center justify-between mt-2">
      <p class="text-2xl font-semibold text-gray-700">{{ value }}</p>
      <span
        class="text-sm font-medium px-2 py-1 rounded-full"
        :class="isPositiveChange ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'"
      >
        {{ change }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    change: {
      type: String,
      default: '0%',
    },
  },
  computed: {
    isPositiveChange() {
      return this.change.startsWith('+')
    },
  },
}
</script>
