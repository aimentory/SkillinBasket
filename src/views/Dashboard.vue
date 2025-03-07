<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <StatCard title="Active Listings" value="24" change="+12%" />
    <StatCard title="Total Revenue" value="$3,240" change="+8%" />
    <StatCard title="New Messages" value="18" change="+6%" />
  </div>

  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <h3 class="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
    <div class="space-y-4">
      <ActivityItem v-for="(item, index) in recentActivity" :key="index" :activity="item" />
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-700">Recent Orders</h3>
        <router-link to="/orders" class="text-sm text-blue-500 hover:text-blue-700">
          View all
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th class="px-4 py-3">Client</th>
              <th class="px-4 py-3">Service</th>
              <th class="px-4 py-3">Amount</th>
              <th class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <img
                    :src="order.client.avatar"
                    :alt="order.client.name"
                    class="h-8 w-8 rounded-full mr-2"
                  />
                  <span class="text-sm font-medium text-gray-900">{{ order.client.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ order.service }}</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900">${{ order.amount }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full"
                  :class="getStatusClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-700">Performance Overview</h3>
        <select class="text-sm border-gray-300 rounded-md">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This Year</option>
        </select>
      </div>

      <div class="space-y-4">
        <!-- Response Rate -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-gray-500">Response Rate</span>
            <span class="text-sm font-medium text-gray-900">98%</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div class="h-2 bg-green-500 rounded-full" style="width: 98%"></div>
          </div>
        </div>

        <!-- On-time Delivery -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-gray-500">On-time Delivery</span>
            <span class="text-sm font-medium text-gray-900">95%</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div class="h-2 bg-blue-500 rounded-full" style="width: 95%"></div>
          </div>
        </div>

        <!-- Order Completion -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-gray-500">Order Completion</span>
            <span class="text-sm font-medium text-gray-900">92%</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div class="h-2 bg-purple-500 rounded-full" style="width: 92%"></div>
          </div>
        </div>

        <!-- Ratings -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium text-gray-500">Average Rating</span>
            <span class="text-sm font-medium text-gray-900">4.8/5</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div class="h-2 bg-yellow-500 rounded-full" style="width: 96%"></div>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-gray-200">
        <h4 class="font-medium text-gray-700 mb-3">Monthly Earnings</h4>
        <div class="h-48 text-center text-gray-500 flex items-center justify-center">
          [Chart placeholder]
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatCard from '../components/dashboard/StatCard.vue'
import ActivityItem from '../components/dashboard/ActivityItem.vue'

export default {
  name: 'UserDashboard',
  components: {
    StatCard,
    ActivityItem,
  },
  data() {
    return {
      recentActivity: [
        {
          type: 'message',
          title: 'New message from Alex',
          description: "Hey, I'm interested in your service. Is it still available?",
          time: '2 hours ago',
        },
        {
          type: 'order',
          title: 'New order received',
          description: 'Website Design service ordered by Sarah M.',
          time: '4 hours ago',
        },
        {
          type: 'review',
          title: 'New 5-star review',
          description: 'James left a 5-star review for Logo Design',
          time: '1 day ago',
        },
      ],
      recentOrders: [
        {
          id: 1,
          client: {
            name: 'Sarah Miller',
            avatar: 'https://via.placeholder.com/40',
          },
          service: 'Website Development',
          amount: 800,
          status: 'In Progress',
        },
        {
          id: 2,
          client: {
            name: 'Michael Chen',
            avatar: 'https://via.placeholder.com/40',
          },
          service: 'Digital Marketing',
          amount: 350,
          status: 'Pending',
        },
        {
          id: 3,
          client: {
            name: 'Emma Wilson',
            avatar: 'https://via.placeholder.com/40',
          },
          service: 'Logo Design',
          amount: 150,
          status: 'Completed',
        },
        {
          id: 4,
          client: {
            name: 'David Lee',
            avatar: 'https://via.placeholder.com/40',
          },
          service: 'Content Writing',
          amount: 75,
          status: 'Cancelled',
        },
      ],
    }
  },
  methods: {
    getStatusClass(status) {
      const statusClasses = {
        'In Progress': 'bg-blue-100 text-blue-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Completed: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
      }

      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    },
  },
}
</script>
