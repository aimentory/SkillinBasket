<template>
  <div class="flex items-start p-4 border-b border-gray-100 last:border-0">
    <div
      class="h-10 w-10 rounded-full flex items-center justify-center mr-4"
      :class="activityTypeClasses[activity.type].bg"
    >
      <!-- Icon would go here in a real app -->
      <div class="h-5 w-5 rounded-full bg-white"></div>
    </div>
    <div class="flex-1">
      <h4 class="text-sm font-medium text-gray-900">{{ activity.title }}</h4>
      <p class="text-sm text-gray-500">{{ activity.description }}</p>
      <span class="text-xs text-gray-400">{{ activity.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityItem',
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activityTypeClasses: {
        message: { bg: 'bg-blue-500' },
        order: { bg: 'bg-green-500' },
        review: { bg: 'bg-yellow-500' },
      },
    }
  },
}
</script>
