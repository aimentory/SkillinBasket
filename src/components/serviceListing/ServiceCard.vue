<template>
  <div
    class="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
  >
    <div class="relative">
      <img :src="service.image" :alt="service.title" class="w-full h-48 object-cover" />
      <div
        class="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700"
      >
        {{ service.category }}
      </div>
    </div>

    <div class="p-4">
      <div class="flex items-center space-x-2 mb-2">
        <img :src="service.seller.avatar" :alt="service.seller.name" class="w-6 h-6 rounded-full" />
        <span class="text-sm text-gray-600">{{ service.seller.name }}</span>
      </div>

      <h3 class="text-lg font-medium text-gray-900 mb-1">{{ service.title }}</h3>
      <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ service.description }}</p>

      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <div class="text-yellow-400 mr-1">★</div>
          <span class="text-sm font-medium">{{ service.rating }}</span>
        </div>
        <span class="text-sm text-gray-500 ml-1">({{ service.reviewCount }})</span>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-gray-100">
        <div class="text-lg font-bold text-gray-900">${{ service.price }}</div>
        <button
          class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          @click.stop="contactSeller"
        >
          Contact
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  methods: {
    contactSeller() {
      // In a real app, this would open a chat with the seller
      // or navigate to a contact form
      this.$emit('contact', this.service.id)
    },
  },
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
