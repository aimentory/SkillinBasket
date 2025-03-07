<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Services</h2>

    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Available Services</h3>
        <div class="flex space-x-2">
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add New
          </button>
        </div>
      </div>

      <p class="text-gray-500">Service Components</p>

      <ServiceListing>
        <!-- Use the ServiceCard component for each service item -->
        <ServiceCard>
          <!-- Use the ServiceDetail component to show details of a service -->
          <ServiceDetail />
        </ServiceCard>
      </ServiceListing>
    </div>
  </div>
</template>

<script>
import ServiceDetail from '../components/serviceListing/ServiceDetail.vue'
import ServiceCard from '../components/serviceListing/ServiceCard.vue'
import ServiceListing from '../components/serviceListing/ServiceListing.vue'

export default {
  name: 'AppServices',
  components: {
    ServiceDetail,
    ServiceCard,
    ServiceListing,
  },
}
</script>
