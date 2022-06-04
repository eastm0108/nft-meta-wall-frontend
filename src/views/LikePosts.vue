<template>
  <div>
    <div class="block-title">
      我按讚的貼文
    </div>
    <LovePost :likePosts="likedPosts"/>
  </div>
</template>

<script>
import { defineComponent, reactive , computed} from 'vue';
import LovePost from '@/components/LovePost.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LikePosts',
  components: {
    LovePost,
  },
  setup() {
    const store = useStore();
    const likePosts = reactive();

    const likedPosts = computed( () =>{
      store.dispatch('post/getLikedPosts')
      const data = store.getters['user/likedPosts']
      return data
    })

    return {
      likePosts,
      likedPosts
    };
  }
});
</script>

<style lang="scss" scoped>
</style>