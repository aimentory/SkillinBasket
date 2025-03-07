<template>
  <aside class="bg-gray-800 text-white w-64 flex-shrink-0 h-screen fixed">
    <div class="p-4">
      <h1 class="text-xl font-bold">Marketplace</h1>
    </div>
    <nav class="mt-8">
      <ul>
        <li v-for="(item, index) in navigationItems" :key="index" class="mb-2">
          <router-link
            :to="item.path"
            class="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors"
            :class="{ 'bg-gray-700': isActive(item.path) }"
          >
            <span class="ml-3">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'MarketplaceSidebar',
  data() {
    return {
      navigationItems: [
        { name: 'Dashboard', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Messages', path: '/messages' },
        { name: 'Notifications', path: '/notifications' },
        { name: 'Profile', path: '/profile' },
      ],
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path === path
    },
  },
}
</script>
