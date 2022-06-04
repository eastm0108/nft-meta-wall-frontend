<template>
  <div class="fixed-menu-layout__menu end">
    <div class="card">
      <router-link
        class="btn"
        to="/publish-post/index"
      >張貼動態</router-link>
      <ul style="margin-top:24px;">
        <li>
          <router-link
            :to="`/personal/${userInfo.id}`"
            class="icon-btn"
          >
            <div class="avatar">
              <img
                class="avatar__img"
                :src="userInfo.avatar"
              >
            </div>
            <p class="icon-btn__text">{{ userInfo.userName }}</p>
          </router-link>
        </li>
        <li style="margin-top:24px;">
          <router-link
            to="/follower/index"
            class="icon-btn"
          >
            <i class="material-icons-outlined icon-btn__icon">
              notifications
            </i>
            <p class="icon-btn__text">追蹤名單</p>
          </router-link>
        </li>
        <li style="margin-top:24px;">
          <router-link
            to="/like-posts/index"
            class="icon-btn"
          >
            <i class="material-icons-outlined icon-btn__icon">
              thumb_up
            </i>
            <p class="icon-btn__text">我按讚的文章</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Sidebar',
  components: {},
  setup() {
    const store = useStore();

    const userInfo = computed(() => {
      return store.getters['user/userInfo'];
    });

    onMounted(async () => {
      await store.dispatch('user/getProfile');
    });

    return { userInfo };
  },
});
</script>

<style lang="scss" scoped>
</style>