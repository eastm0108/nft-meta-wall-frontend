<template>
  <div>
    <Searchbar :sort="storePost.timeSort" @sort="sort" @search="search" />
    <Posts :posts="storePost.posts" :hasNextPage="storePost.hasNextPage" @fetchNextPosts="fetchNextPosts" />
  </div>
</template>


<script>
import { defineComponent, computed, onMounted } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex';
import Searchbar from '@/components/Searchbar.vue';
import Posts from '@/components/Posts.vue';


export default defineComponent({
  name: 'Home',
  components: {
    Searchbar,
    Posts,
  },
  setup(props) {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch('post/fetchPublicPosts');
    });

    const storePost = computed(() => {
      const data = store.getters['post/publicPosts'];

      return data;
    });

    const sort = async (sortType) => {
      await store.dispatch('post/fetchPublicPosts', { timeSort: sortType, page: 1  });
    };

    const search = async (text) => {
      await store.dispatch('post/fetchPublicPosts', { keyword: text, page: 1 });
    };

    const fetchNextPosts = async () => {
      await store.dispatch('post/fetchPublicNextPosts', { page: storePost.value.page + 1 });
    };

    onBeforeRouteUpdate((to, from) => {
      store.dispatch('post/fetchPublicPosts');
    });

    onBeforeRouteLeave((to, from) => {
      store.dispatch('post/initPublicData');
    });

    return {
      storePost,
      sort,
      search,
      fetchNextPosts,
    };
  }
});
</script>


<style lang="scss" scoped>
</style>