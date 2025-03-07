<template>
  <header class="bg-white shadow h-16 flex items-center px-6">
    <div class="flex-1">
      <h2 class="text-xl font-semibold text-gray-700">{{ pageTitle }}</h2>
    </div>
    <div class="flex items-center space-x-4">
      <div class="relative">
        <button class="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <span class="sr-only">Notifications</span>
          <div class="relative">
            <span
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
            >
              3
            </span>
            <!-- Notification Icon (simplified for example) -->
            <div class="h-6 w-6 rounded-full bg-gray-200"></div>
          </div>
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <img
          class="h-8 w-8 rounded-full object-cover"
          src="https://via.placeholder.com/40"
          alt="User avatar"
        />
        <span class="text-sm font-medium text-gray-700">John Doe</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    pageTitle() {
      // Could be dynamically determined based on route
      return this.$route.name || 'Dashboard'
    },
  },
}
</script>
