<template>
  <!-- 追蹤 -->
  <div class="track-container radius track" style="margin-bottom: 14px;">
    <div class="track-content">
      <img
        class="track-content__img"
        src="@/assets/user5-4.png"
        alt="追蹤這照片"
      />
      <div style="margin-left: 16px;">
        <p class="track-content__name">{{uProfile.userName}}</p>
        <p class="track-content__text" v-if="uProfile.follow">{{ thousandSeparator(uProfile.follow.length) + ' 人追蹤'}}</p>
      </div>
      <button class="btn secondary small" @click="getTrick(userInfo.id,$route.params.id)">追蹤</button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent , onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { thousandSeparator } from '@/utils/unit';

export default defineComponent({
  name: 'Track',
  components: {
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const uProfile = computed( () =>{
      const data = store.getters['user/otherUserInfo']
      return data
    })
    const userInfo = computed(() => {
      return store.getters['user/userInfo'];
    });
    onMounted(async () => {
      const userId = router.currentRoute._value.params.id
      const test2 = await store.dispatch('user/getOtherUser',{'id':userId});
      console.log('test2',test2)
    });

    const getTrick = (userId,followId)=>{
      console.log(userId,followId)
      store.dispatch('user/updateFollower',{'userid':userId,'followId':followId})
    }
    return {
      userInfo,
      uProfile,
      thousandSeparator,
      getTrick
    };
  }
});
</script>

<style lang="scss" scoped>
</style>