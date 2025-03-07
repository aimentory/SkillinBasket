<template>
  <div class="bg-white rounded-lg shadow h-[calc(100vh-12rem)]">
    <div class="flex h-full">
      <!-- Conversation List -->
      <div class="w-1/3 border-r border-gray-200 h-full flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Messages</h2>
          <div class="relative mt-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search conversations..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button class="absolute right-3 top-2.5 text-gray-400">
              <!-- Search icon placeholder -->
              <div class="w-5 h-5 rounded-full bg-gray-400"></div>
            </button>
          </div>
        </div>

        <div class="overflow-y-auto flex-1">
          <div
            v-for="conversation in filteredConversations"
            :key="conversation.id"
            @click="selectConversation(conversation.id)"
            class="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
            :class="{ 'bg-blue-50': selectedConversationId === conversation.id }"
          >
            <div class="flex items-start">
              <img
                :src="conversation.user.avatar"
                :alt="conversation.user.name"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline justify-between">
                  <h4 class="text-sm font-medium text-gray-900 truncate">
                    {{ conversation.user.name }}
                  </h4>
                  <span class="text-xs text-gray-500">{{ conversation.lastMessageTime }}</span>
                </div>
                <p
                  class="text-sm text-gray-500 truncate"
                  :class="{ 'font-bold': conversation.unread }"
                >
                  {{ conversation.lastMessage }}
                </p>
                <div class="flex items-center mt-1">
                  <span class="text-xs text-gray-400">{{ conversation.service.title }}</span>
                  <div
                    v-if="conversation.unread"
                    class="ml-2 w-2 h-2 bg-blue-500 rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Thread -->
      <div class="w-2/3 flex flex-col h-full">
        <div v-if="selectedConversation" class="flex-1 flex flex-col">
          <!-- Conversation Header -->
          <div class="p-4 border-b border-gray-200 flex items-center justify-between">
            <div class="flex items-center">
              <img
                :src="selectedConversation.user.avatar"
                :alt="selectedConversation.user.name"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 class="text-sm font-medium text-gray-900">
                  {{ selectedConversation.user.name }}
                </h3>
                <p class="text-xs text-gray-500">{{ selectedConversation.service.title }}</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                <!-- Call icon placeholder -->
                <div class="w-5 h-5 rounded-full bg-gray-500"></div>
              </button>
              <button class="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                <!-- More options icon placeholder -->
                <div class="w-5 h-5 rounded-full bg-gray-500"></div>
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div class="flex-1 p-4 overflow-y-auto" ref="messagesContainer">
            <div
              v-for="(message, index) in selectedConversation.messages"
              :key="index"
              class="mb-4"
            >
              <div v-if="showDateDivider(message, index)" class="flex justify-center my-4">
                <span class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                  {{ formatDate(message.timestamp) }}
                </span>
              </div>

              <div
                class="flex"
                :class="message.sender === 'user' ? 'justify-start' : 'justify-end'"
              >
                <div class="flex items-end max-w-[80%]">
                  <img
                    v-if="message.sender === 'user'"
                    :src="selectedConversation.user.avatar"
                    :alt="selectedConversation.user.name"
                    class="w-8 h-8 rounded-full mr-2 mb-1"
                  />

                  <div
                    class="p-3 rounded-lg"
                    :class="
                      message.sender === 'user'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-500 text-white'
                    "
                  >
                    <p class="text-sm">{{ message.text }}</p>
                    <div
                      class="text-xs mt-1 text-right"
                      :class="message.sender === 'user' ? 'text-gray-500' : 'text-blue-200'"
                    >
                      {{ formatTime(message.timestamp) }}
                    </div>
                  </div>

                  <img
                    v-if="message.sender === 'me'"
                    src="https://via.placeholder.com/40"
                    alt="Me"
                    class="w-8 h-8 rounded-full ml-2 mb-1"
                  />
                </div>
              </div>
            </div>

            <div v-if="isTyping" class="flex justify-start mb-4">
              <div class="bg-gray-100 p-3 rounded-lg">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="p-4 border-t border-gray-200">
            <div class="flex items-end space-x-2">
              <button class="p-2 text-gray-500 hover:text-gray-700">
                <!-- Attachment icon placeholder -->
                <div class="w-5 h-5 rounded-full bg-gray-400"></div>
              </button>

              <div
                class="flex-1 border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
              >
                <textarea
                  v-model="newMessage"
                  placeholder="Type a message..."
                  rows="1"
                  class="w-full px-3 py-2 focus:outline-none resize-none rounded-lg"
                  @keydown.enter.prevent="sendMessage"
                ></textarea>
              </div>

              <button
                @click="sendMessage"
                :disabled="!newMessage.trim()"
                class="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
              >
                <!-- Send icon placeholder -->
                <div class="w-5 h-5 rounded-full bg-white"></div>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="flex-1 flex items-center justify-center">
          <div class="text-center text-gray-500">
            <div class="mb-4">
              <!-- Empty state icon placeholder -->
              <div class="mx-auto w-16 h-16 rounded-full bg-gray-200"></div>
            </div>
            <h3 class="text-lg font-medium mb-2">No conversation selected</h3>
            <p>Choose a conversation from the list or start a new one.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnhancedMessaging',
  data() {
    return {
      searchQuery: '',
      selectedConversationId: null,
      newMessage: '',
      isTyping: false,
      conversations: [
        {
          id: 1,
          user: {
            id: 101,
            name: 'Alex Johnson',
            avatar: 'https://via.placeholder.com/40',
          },
          service: {
            id: 201,
            title: 'Logo Design',
          },
          unread: true,
          lastMessage: 'I love the design! Can you make one small change?',
          lastMessageTime: '10:42 AM',
          messages: [
            {
              sender: 'user',
              text: "Hi there! I'm interested in your logo design service.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            },
            {
              sender: 'me',
              text: 'Hello! Thank you for your interest. What kind of logo are you looking for?',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30), // 2 days ago + 30 min
            },
            {
              sender: 'user',
              text: 'I need a modern logo for my tech startup. Something clean and minimalist.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            },
            {
              sender: 'me',
              text: 'I understand. I can definitely create something modern and minimalist. Could you tell me a bit more about your startup and any color preferences?',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 5), // 1 day ago + 5 min
            },
            {
              sender: 'user',
              text: "We're a SaaS company focused on productivity tools. I prefer blue and gray tones. Here's our website for reference: example.com",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
            },
            {
              sender: 'me',
              text: "Thanks for the details! I'll work on some concepts and get back to you tomorrow. Does that timeline work for you?",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23 + 1000 * 60 * 10), // 23 hours ago + 10 min
            },
            {
              sender: 'user',
              text: 'That works perfectly. Looking forward to seeing your ideas!',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
            },
            {
              sender: 'me',
              text: "Here are three concepts I've created for your logo. Let me know which direction you prefer, and we can refine from there.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            },
            {
              sender: 'user',
              text: 'I love the design! Can you make one small change?',
              timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            },
          ],
        },
        {
          id: 2,
          user: {
            id: 102,
            name: 'Sarah Miller',
            avatar: 'https://via.placeholder.com/40',
          },
          service: {
            id: 202,
            title: 'Website Development',
          },
          unread: false,
          lastMessage: 'The website looks great! Just sent the final payment.',
          lastMessageTime: 'Yesterday',
          messages: [
            {
              sender: 'user',
              text: "Hi, I'm interested in your website development service.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
            },
            {
              sender: 'me',
              text: "Hello Sarah! I'd be happy to help with your website. What kind of site do you need?",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 15), // 5 days ago + 15 min
            },
            {
              sender: 'user',
              text: 'I need an e-commerce site for my handmade jewelry business.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
            },
            {
              sender: 'me',
              text: 'The website looks great! Just sent the final payment.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            },
          ],
        },
        {
          id: 3,
          user: {
            id: 103,
            name: 'Michael Chen',
            avatar: 'https://via.placeholder.com/40',
          },
          service: {
            id: 203,
            title: 'Digital Marketing',
          },
          unread: true,
          lastMessage: 'When can we start the campaign?',
          lastMessageTime: '2 days ago',
          messages: [
            {
              sender: 'user',
              text: 'Hello, I need help with digital marketing for my new app launch.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
            },
            {
              sender: 'me',
              text: "Hi Michael! I'd love to help with your app launch. What platforms are you targeting?",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 45), // 7 days ago + 45 min
            },
            {
              sender: 'user',
              text: 'Mainly Instagram and TikTok, as our app is targeted at Gen Z users.',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
            },
            {
              sender: 'user',
              text: 'When can we start the campaign?',
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            },
          ],
        },
      ],
    }
  },
  computed: {
    filteredConversations() {
      if (!this.searchQuery) {
        return this.conversations
      }

      const query = this.searchQuery.toLowerCase()
      return this.conversations.filter((conversation) => {
        return (
          conversation.user.name.toLowerCase().includes(query) ||
          conversation.lastMessage.toLowerCase().includes(query) ||
          conversation.service.title.toLowerCase().includes(query)
        )
      })
    },
    selectedConversation() {
      return this.conversations.find((c) => c.id === this.selectedConversationId)
    },
  },
  watch: {
    selectedConversationId(newVal) {
      if (newVal) {
        // Mark conversation as read when selected
        const conversation = this.conversations.find((c) => c.id === newVal)
        if (conversation) {
          conversation.unread = false

          // Scroll to bottom of messages on conversation change
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        }
      }
    },
  },
  methods: {
    selectConversation(id) {
      this.selectedConversationId = id
    },
    sendMessage() {
      if (!this.newMessage.trim() || !this.selectedConversation) return

      // Add message to the current conversation
      this.selectedConversation.messages.push({
        sender: 'me',
        text: this.newMessage,
        timestamp: new Date(),
      })

      // Update last message info
      this.selectedConversation.lastMessage = this.newMessage
      this.selectedConversation.lastMessageTime = 'Just now'

      // Clear input
      this.newMessage = ''

      // Scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom()
      })

      // Simulate typing response
      this.simulateResponse()
    },
    scrollToBottom() {
      if (this.$refs.messagesContainer) {
        this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight
      }
    },
    simulateResponse() {
      // Simulate typing indicator
      setTimeout(() => {
        this.isTyping = true

        // Simulate response after typing
        setTimeout(() => {
          this.isTyping = false

          if (this.selectedConversation) {
            const responses = [
              "Thanks for your message! I'll get back to you soon.",
              "Got it! I'll work on this right away.",
              'Perfect! Let me know if you need anything else.',
              "I appreciate your feedback. I'll make those changes.",
              'Great! Looking forward to working with you.',
            ]

            const randomResponse = responses[Math.floor(Math.random() * responses.length)]

            this.selectedConversation.messages.push({
              sender: 'user',
              text: randomResponse,
              timestamp: new Date(),
            })

            // Update last message info
            this.selectedConversation.lastMessage = randomResponse
            this.selectedConversation.lastMessageTime = 'Just now'

            // Scroll to bottom
            this.$nextTick(() => {
              this.scrollToBottom()
            })
          }
        }, 2000)
      }, 1000)
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    formatDate(date) {
      const messageDate = new Date(date)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      if (messageDate.toDateString() === today.toDateString()) {
        return 'Today'
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday'
      } else {
        return messageDate.toLocaleDateString([], {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      }
    },
    showDateDivider(message, index) {
      if (index === 0) return true

      const currentDate = new Date(message.timestamp).toDateString()
      const prevDate = new Date(
        this.selectedConversation.messages[index - 1].timestamp,
      ).toDateString()

      return currentDate !== prevDate
    },
  },
  mounted() {
    // Select first conversation by default
    if (this.conversations.length > 0 && !this.selectedConversationId) {
      this.selectedConversationId = this.conversations[0].id
    }
  },
}
</script>
