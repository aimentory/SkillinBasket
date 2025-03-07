<template>
  <div class="space-y-6">
    <!-- Search and filter section -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search services..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button class="absolute right-2 top-2 text-gray-400">
              <!-- Search icon placeholder -->
              <div class="w-5 h-5 rounded-full bg-gray-400"></div>
            </button>
          </div>
        </div>

        <div class="flex space-x-2">
          <select
            v-model="categoryFilter"
            class="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>

          <select
            v-model="priceFilter"
            class="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Price Range</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500+">$500+</option>
          </select>

          <select
            v-model="sortBy"
            class="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Service cards grid -->
    <div
      v-if="filteredServices.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ServiceCard
        v-for="service in filteredServices"
        :key="service.id"
        :service="service"
        @click="viewServiceDetails(service.id)"
      />
    </div>

    <div v-else class="bg-white rounded-lg shadow p-8 text-center">
      <p class="text-gray-500">No services found matching your criteria.</p>
      <button
        @click="resetFilters"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Reset Filters
      </button>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8">
      <div class="flex space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          class="px-4 py-2 border rounded-md"
          :class="
            currentPage === page ? 'bg-blue-600 text-white' : 'border-gray-300 hover:bg-gray-100'
          "
        >
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceCard from './ServiceCard.vue'
import { ref, computed } from 'vue'

export default {
  name: 'ServiceListing',
  components: {
    ServiceCard,
  },
  setup() {
    const searchQuery = ref('')
    const categoryFilter = ref('')
    const priceFilter = ref('')
    const sortBy = ref('newest')
    const currentPage = ref(1)
    const itemsPerPage = 9

    // Sample data - in a real app, this would come from an API
    const services = ref([
      {
        id: 1,
        title: 'Professional Logo Design',
        description: 'Get a custom logo design that represents your brand perfectly.',
        price: 150,
        rating: 4.9,
        reviewCount: 127,
        category: 'Design',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'Alex Johnson',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-11-10',
      },
      {
        id: 2,
        title: 'Website Development',
        description: 'Full stack web development using modern technologies.',
        price: 500,
        rating: 4.8,
        reviewCount: 86,
        category: 'Development',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'Maria Garcia',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-11-08',
      },
      {
        id: 3,
        title: 'Social Media Management',
        description: 'Comprehensive social media management to grow your online presence.',
        price: 299,
        rating: 4.7,
        reviewCount: 54,
        category: 'Marketing',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'James Smith',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-11-05',
      },
      {
        id: 4,
        title: 'Content Writing',
        description: 'High-quality content writing for blogs, websites, and more.',
        price: 75,
        rating: 4.6,
        reviewCount: 42,
        category: 'Writing',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'Emma Wilson',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-11-02',
      },
      {
        id: 5,
        title: 'Video Editing',
        description: 'Professional video editing for all your promotional needs.',
        price: 120,
        rating: 4.8,
        reviewCount: 63,
        category: 'Video',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'David Lee',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-10-29',
      },
      {
        id: 6,
        title: 'SEO Optimization',
        description: 'Improve your search engine rankings with our expert SEO services.',
        price: 200,
        rating: 4.5,
        reviewCount: 38,
        category: 'Marketing',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'Sophie Brown',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-10-25',
      },
      {
        id: 7,
        title: 'Mobile App Development',
        description: 'Custom mobile app development for iOS and Android.',
        price: 800,
        rating: 4.9,
        reviewCount: 72,
        category: 'Development',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'Michael Chen',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-10-20',
      },
      {
        id: 8,
        title: 'Illustration Design',
        description: 'Custom illustrations for your brand, products, or publications.',
        price: 85,
        rating: 4.7,
        reviewCount: 51,
        category: 'Design',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'Olivia Martin',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-10-15',
      },
      {
        id: 9,
        title: 'Digital Marketing Strategy',
        description: 'Comprehensive digital marketing strategy for your business.',
        price: 350,
        rating: 4.6,
        reviewCount: 44,
        category: 'Marketing',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'Noah Taylor',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-10-10',
      },
      {
        id: 10,
        title: 'E-commerce Setup',
        description: 'Complete e-commerce store setup and configuration.',
        price: 250,
        rating: 4.8,
        reviewCount: 58,
        category: 'Development',
        image: 'https://via.placeholder.com/300x200',
        seller: {
          name: 'Isabella White',
          avatar: 'https://via.placeholder.com/40',
        },
        createdAt: '2023-10-05',
      },
    ])

    // Extract unique categories for the filter dropdown
    const categories = computed(() => {
      const uniqueCategories = new Set(services.value.map((service) => service.category))
      return Array.from(uniqueCategories)
    })

    // Filter services based on search query and filters
    const filteredServices = computed(() => {
      let result = services.value

      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(
          (service) =>
            service.title.toLowerCase().includes(query) ||
            service.description.toLowerCase().includes(query),
        )
      }

      // Apply category filter
      if (categoryFilter.value) {
        result = result.filter((service) => service.category === categoryFilter.value)
      }

      // Apply price filter
      if (priceFilter.value) {
        const [min, max] = priceFilter.value.split('-')
        if (max) {
          result = result.filter(
            (service) => service.price >= Number(min) && service.price <= Number(max),
          )
        } else {
          // Handle "500+" case
          result = result.filter((service) => service.price >= Number(min.replace('+', '')))
        }
      }

      // Apply sorting
      switch (sortBy.value) {
        case 'newest':
          result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'price_low':
          result = [...result].sort((a, b) => a.price - b.price)
          break
        case 'price_high':
          result = [...result].sort((a, b) => b.price - a.price)
          break
        case 'rating':
          result = [...result].sort((a, b) => b.rating - a.rating)
          break
      }

      return result
    })

    // Pagination
    const totalPages = computed(() => Math.ceil(filteredServices.value.length / itemsPerPage))

    const paginatedServices = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return filteredServices.value.slice(startIndex, endIndex)
    })

    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    function goToPage(page) {
      currentPage.value = page
    }

    function resetFilters() {
      searchQuery.value = ''
      categoryFilter.value = ''
      priceFilter.value = ''
      sortBy.value = 'newest'
      currentPage.value = 1
    }

    function viewServiceDetails(serviceId) {
      // In a real app, this would navigate to the service detail page
      console.log(`View service details for ID: ${serviceId}`)
      // this.$router.push(`/services/${serviceId}`);
    }

    return {
      searchQuery,
      categoryFilter,
      priceFilter,
      sortBy,
      services: paginatedServices,
      filteredServices: paginatedServices,
      categories,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      goToPage,
      resetFilters,
      viewServiceDetails,
    }
  },
}
</script>
