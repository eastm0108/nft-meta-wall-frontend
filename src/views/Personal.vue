<template>
  <div>
      <h1>UserID: {{ $route.params.id }}</h1>

    <transition name="fade">
      <div v-if="!isSelf">
        <Track />
      </div>
    </transition>
    <Searchbar :sort="storePost.timeSort" @sort="sort" @search="search" />
    <Posts :posts="storePost.posts" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import Track from '@/components/Track.vue';
import Searchbar from '@/components/Searchbar.vue';
import Posts from '@/components/Posts.vue';



export default defineComponent({
  name: 'Personal',
  components: {
    Track,
    Searchbar,
    Posts,
  },
  setup() {
    const store = useStore();
    const selfId = store.getters['user/userInfo']?.id;
    let id = useRoute().params?.id;
    console.log('selfId',selfId,'id',id)
    const isSelf = ref(selfId == id);

    onMounted(async () => {
      await store.dispatch('post/fetchPrivatePosts', { authorId: id });
    });

    const storePost = computed(() => {
      const data = store.getters['post/privatePosts'];

      return data;
    });

    const sort = async (sortType) => {
      await store.dispatch('post/fetchPrivatePosts', { timeSort: sortType });
    };

    const search = async (text) => {
      await store.dispatch('post/fetchPrivatePosts', { keyword: text });
    };

    onBeforeRouteLeave((to, from) => {
      store.dispatch('post/initPrivateData');
    });

    onBeforeRouteUpdate((to, from) => {
      if (to.params.id !== from.params.id) {
        const newId = to.params.id;
        isSelf.value = selfId == newId;
        store.dispatch('post/fetchPrivatePosts', { authorId: newId });
      }
        store.dispatch('post/fetchPrivatePosts', { userId: newId });
    });

    return {
      isSelf,
      storePost,
      sort,
      search,
    };
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.333s; 
}

.fade-enter-from,.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>