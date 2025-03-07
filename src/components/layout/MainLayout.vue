<template>
  <div class="flex flex-col min-h-screen gap-x-4 bg-gray-100">
    <MarketplaceSidebar />
    <!-- Change this from ml-64 to ml-0 if Sidebar has position fixed -->
    <div class="flex-1 flex flex-col ml-0 pl-64">
      <AppHeader />
      <main class="flex-1 p-6 overflow-auto">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import MarketplaceSidebar from './Sidebar.vue'
import AppHeader from './Header.vue'

export default {
  name: 'MainLayout',
  components: {
    MarketplaceSidebar,
    AppHeader,
  },
}
</script>
