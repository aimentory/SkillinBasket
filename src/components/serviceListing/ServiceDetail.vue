<template>
  <div v-if="service" class="space-y-6">
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Service header -->
      <div class="relative">
        <img :src="service.image" :alt="service.title" class="w-full h-64 object-cover" />
        <button
          @click="goBack"
          class="absolute top-4 left-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          <div class="w-5 h-5 rotate-180">←</div>
        </button>
      </div>

      <!-- Service info -->
      <div class="p-6">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-3">
              <span class="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                {{ service.category }}
              </span>
              <div class="flex items-center">
                <div class="text-yellow-400 mr-1">★</div>
                <span class="text-sm font-medium">{{ service.rating }}</span>
                <span class="text-sm text-gray-500 ml-1">({{ service.reviewCount }} reviews)</span>
              </div>
            </div>

            <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ service.title }}</h1>
            <p class="text-gray-600 mb-4">{{ service.description }}</p>

            <div class="flex items-center space-x-3 mb-6">
              <img
                :src="service.seller.avatar"
                :alt="service.seller.name"
                class="w-10 h-10 rounded-full"
              />
              <div>
                <div class="font-medium">{{ service.seller.name }}</div>
                <div class="text-sm text-gray-500">Member since {{ sellerJoinDate }}</div>
              </div>
            </div>
          </div>

          <div class="md:ml-6 bg-gray-50 p-4 rounded-lg w-full md:w-64">
            <div class="text-2xl font-bold text-gray-900 mb-2">${{ service.price }}</div>
            <div class="text-sm text-gray-500 mb-4">
              Delivery in {{ service.deliveryTime || 3 }} days
            </div>

            <button class="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2">
              Order Now
            </button>
            <button
              class="w-full py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Service details tabs -->
    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200">
        <nav class="flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-4 text-sm font-medium"
            :class="
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            "
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- Description tab -->
        <div v-if="activeTab === 'description'">
          <h3 class="text-lg font-medium text-gray-900 mb-4">About This Service</h3>
          <div class="prose max-w-none">
            <p>
              {{
                service.fullDescription ||
                'This is a detailed description of the service. It would include information about what is included, the process, and what the client can expect. This would be a much longer text than the short description shown in the service card.'
              }}
            </p>

            <h4 class="text-lg font-medium text-gray-900 mt-6 mb-3">What's Included</h4>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in service.includes || dummyIncludes"
                :key="index"
                class="flex items-start"
              >
                <div class="text-green-500 mr-2">✓</div>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Reviews tab -->
        <div v-if="activeTab === 'reviews'" class="space-y-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Customer Reviews</h3>
            <div class="flex items-center">
              <div class="text-yellow-400 mr-1">★</div>
              <span class="font-medium">{{ service.rating }}</span>
              <span class="text-gray-500 ml-1">({{ service.reviewCount }})</span>
            </div>
          </div>

          <div v-if="reviews.length" class="space-y-4">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="border-b border-gray-200 pb-4 last:border-0"
            >
              <div class="flex items-start">
                <img
                  :src="review.user.avatar"
                  :alt="review.user.name"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <div class="font-medium">{{ review.user.name }}</div>
                    <div class="text-sm text-gray-500">{{ review.date }}</div>
                  </div>
                  <div class="flex items-center mt-1 mb-2">
                    <div v-for="i in 5" :key="i" class="text-yellow-400">
                      {{ i <= review.rating ? '★' : '☆' }}
                    </div>
                  </div>
                  <p class="text-gray-600">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500 py-4">No reviews yet.</div>
        </div>

        <!-- FAQ tab -->
        <div v-if="activeTab === 'faq'" class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>

          <div
            v-for="(faq, index) in service.faqs || dummyFaqs"
            :key="index"
            class="border-b border-gray-200 pb-4 last:border-0"
          >
            <button
              @click="toggleFaq(index)"
              class="flex items-center justify-between w-full text-left font-medium text-gray-900 py-2"
            >
              <span>{{ faq.question }}</span>
              <span>{{ openFaqs.includes(index) ? '−' : '+' }}</span>
            </button>
            <div v-if="openFaqs.includes(index)" class="mt-2 text-gray-600">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-64">
    <div class="text-gray-500">Loading service details...</div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDetail',
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      service: null,
      activeTab: 'description',
      openFaqs: [],
      tabs: [
        { id: 'description', name: 'Description' },
        { id: 'reviews', name: 'Reviews' },
        { id: 'faq', name: 'FAQ' },
      ],
      dummyIncludes: [
        'High-resolution files delivered',
        'Up to 3 revisions',
        '100% satisfaction guarantee',
        'Commercial usage rights',
        'Fast 3-day delivery',
      ],
      dummyFaqs: [
        {
          question: 'How many revisions do I get?',
          answer:
            'You get up to 3 revisions with this package. Additional revisions can be purchased separately.',
        },
        {
          question: 'What file formats will I receive?',
          answer:
            'You will receive all source files in their native formats, as well as PNG, JPG, and PDF for easy usage.',
        },
        {
          question: 'Do I own the copyright to the delivered work?',
          answer:
            'Yes, once the project is completed and payment is made, you will own all copyrights to the delivered work.',
        },
        {
          question: 'How can I request changes?',
          answer:
            'After delivery, you can request changes through the revision system. Simply describe what you want modified and the seller will make the requested changes.',
        },
      ],
      reviews: [
        {
          id: 1,
          user: {
            name: 'Sarah Johnson',
            avatar: 'https://via.placeholder.com/40',
          },
          rating: 5,
          comment:
            'Absolutely amazing work! The designer was very responsive and delivered exactly what I was looking for. Will definitely use again.',
          date: '2 weeks ago',
        },
        {
          id: 2,
          user: {
            name: 'Michael Brown',
            avatar: 'https://via.placeholder.com/40',
          },
          rating: 4,
          comment:
            'Great service and quality. Just needed a few minor revisions to get it perfect, but overall very satisfied with the result.',
          date: '1 month ago',
        },
        {
          id: 3,
          user: {
            name: 'Emily Davis',
            avatar: 'https://via.placeholder.com/40',
          },
          rating: 5,
          comment:
            'Excellent communication and quick turnaround. The seller was able to capture exactly the style I was going for. Highly recommended!',
          date: '2 months ago',
        },
      ],
    }
  },
  computed: {
    sellerJoinDate() {
      // In a real app, this would format the actual date
      return 'January 2023'
    },
  },
  methods: {
    toggleFaq(index) {
      if (this.openFaqs.includes(index)) {
        this.openFaqs = this.openFaqs.filter((i) => i !== index)
      } else {
        this.openFaqs.push(index)
      }
    },
    goBack() {
      // In a real app, this would navigate back
      // this.$router.back();
    },
    fetchServiceData() {
      // In a real app, this would make an API call
      // For now, we'll use dummy data
      setTimeout(() => {
        this.service = {
          id: this.id,
          title: 'Professional Logo Design',
          description: 'Get a custom logo design that represents your brand perfectly.',
          fullDescription:
            'Our professional logo design service provides you with a unique, memorable logo that perfectly captures your brand identity. We work closely with you to understand your brand values, target audience, and design preferences to create a logo that stands out from the competition.',
          price: 150,
          rating: 4.9,
          reviewCount: 127,
          category: 'Design',
          image: 'https://via.placeholder.com/800x400',
          deliveryTime: 3,
          seller: {
            name: 'Alex Johnson',
            avatar: 'https://via.placeholder.com/40',
            joinDate: '2023-01-15',
          },
          includes: this.dummyIncludes,
          faqs: this.dummyFaqs,
        }
      }, 500)
    },
  },
  created() {
    this.fetchServiceData()
  },
}
</script>
