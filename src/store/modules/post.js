import {
  getPosts,
  getUserPosts,
  getPostById,
  createPost,
  addPostComment,
  updatePost,
  updatePostLikes,
  deletePost,
} from '@/api/post';
import { getLocalStorageToken, setLocalStorageToken, removeLocalStorageToken } from '@/utils/auth';

const _initData = {
  keyword: '',
  timeSort: 'desc',
  limit: 10,
  page: 1,
  count: 0,
  posts: [],
};

export const state = {
  // 公開
  public: {
    keyword: '',
    timeSort: 'desc',
    limit: 10,
    page: 1,
    count: 0,
    posts: [],
  },
  // 私人(個人)
  private: {
    keyword: '',
    timeSort: 'desc',
    limit: 10,
    page: 1,
    count: 0,
    posts: [],
    userId: '',
  },
};

export const actions = {
  initPublicData({ commit }) {
    commit('UPDATE_PUBLIC_STATES', { ..._initData });
  },
  initPrivateData({ commit }) {
    commit('UPDATE_PRIVATE_STATES', { ..._initData, userId: '' });
  },
  async fetchPublicPosts({ commit, state, dispatch }, filters = {}) {
    try {
      dispatch('ui/toggleLoading', true, { root: true });

      commit('UPDATE_PUBLIC_STATES', { ...filters });

      const { keyword, timeSort, page } = state.public;
      const data = {};

      data['limit'] = state.public.limit;
      state.public.keyword !== '' && (data['keyword'] = keyword);
      state.public.timeSort !== '' && (data['timeSort'] = timeSort);
      typeof state.public.page === 'number' && state.public.page > 0 && (data['page'] = page);

      const { status, data: fetchData } = await getPosts({ ...data });
      const newData = {
        ...fetchData,
        page: Number(fetchData.page),
      }

      status === 'success' && (commit('UPDATE_PUBLIC_STATES', { ...newData }));
    } catch (error) {
      console.log(error);

      commit('UPDATE_PUBLIC_STATES', { posts: [] });

      return error;
    } finally {
      dispatch('ui/toggleLoading', false, { root: true });
    }
  },
  async fetchPrivatePosts({ commit, state, dispatch }, filters = {}) {
    try {
      dispatch('ui/toggleLoading', true, { root: true });

      commit('UPDATE_PRIVATE_STATES', { ...filters });

      const { keyword, timeSort, page } = state.private;
      const data = {};

      data['limit'] = state.private.limit;
      state.private.keyword !== '' && (data['keyword'] = keyword);
      state.private.timeSort !== '' && (data['timeSort'] = timeSort);
      typeof state.private.page === 'number' && state.private.page > 0 && (data['page'] = page);

      const { status, data: fetchData } = await getUserPosts(state.private.userId, { ...data });
      const newData = {
        ...fetchData,
        page: Number(fetchData.page),
      }

      status === 'success' && (commit('UPDATE_PRIVATE_STATES', { ...newData }));
    } catch (error) {
      console.log(error);

      commit('UPDATE_PRIVATE_STATES', { posts: [] });

      return error;
    } finally {
      dispatch('ui/toggleLoading', false, { root: true });
    }
  },
  async addPost({ commit, dispatch }, data = {}) {
    try {
      dispatch('ui/toggleLoading', true, { root: true });

      const result = await createPost(data);

      return result;
    } catch (error) {
      return error;
    } finally {
      dispatch('ui/toggleLoading', false, { root: true });
    }
  },
  async fetchPublicNextPosts({ commit, state, dispatch }, filters = {}) {
    try {
      dispatch('ui/toggleLoading', true, { root: true });

      commit('UPDATE_PUBLIC_STATES', { ...filters });

      const { keyword, timeSort, page } = state.public;
      const data = {};

      data['limit'] = state.public.limit;
      state.public.keyword !== '' && (data['keyword'] = keyword);
      state.public.timeSort !== '' && (data['timeSort'] = timeSort);
      typeof state.public.page === 'number' && state.public.page > 0 && (data['page'] = page);

      const { status, data: fetchData } = await getPosts({ ...data });
      // 舊文章資料
      const oldPosts = state?.public?.posts.map(post => post);

      // 合併新舊貼文
      fetchData?.posts.length > 0 && (fetchData.posts = oldPosts.concat(fetchData.posts));

      const newData = {
        ...fetchData,
        page: Number(fetchData.page),
      }

      status === 'success' && (commit('UPDATE_PUBLIC_STATES', { ...newData }));
    } catch (error) {
      console.log(error);

      commit('UPDATE_PUBLIC_STATES', { posts: [] });

      return error;
    } finally {
      dispatch('ui/toggleLoading', false, { root: true });
    }
  },
  async fetchPrivateNextPosts({ commit, state, dispatch }, filters = {}) {
    try {
      dispatch('ui/toggleLoading', true, { root: true });

      commit('UPDATE_PUBLIC_STATES', { ...filters });

      const { keyword, timeSort, page } = state.private;
      const data = {};

      data['limit'] = state.private.limit;
      state.private.keyword !== '' && (data['keyword'] = keyword);
      state.private.timeSort !== '' && (data['timeSort'] = timeSort);
      typeof state.private.page === 'number' && state.private.page > 0 && (data['page'] = page);

      const { status, data: fetchData } = await getPosts({ ...data });
      // 舊文章資料
      const oldPosts = state?.private?.posts.map(post => post);

      // 合併新舊貼文
      fetchData?.posts.length > 0 && (fetchData.posts = oldPosts.concat(fetchData.posts));

      const newData = {
        ...fetchData,
        page: Number(fetchData.page),
      }

      status === 'success' && (commit('UPDATE_PRIVATE_STATES', { ...newData }));
    } catch (error) {
      console.log(error);

      commit('UPDATE_PRIVATE_STATES', { posts: [] });

      return error;
    } finally {
      dispatch('ui/toggleLoading', false, { root: true });
    }
  },
};

export const mutations = {
  UPDATE_PUBLIC_STATES(state, keyValues) {
    Object.keys(keyValues).forEach((key) => {
      state.public[key] = keyValues[key];
    });
  },
  UPDATE_PRIVATE_STATES: (state, keyValues) => {
    Object.keys(keyValues).forEach((key) => {
      state.private[key] = keyValues[key];
    });
  },
};

export const getters = {
  publicPosts: (state) => {
    const { keyword, timeSort, limit, page, count, posts } = state.public;
    const hasNextPage = page < count / limit;

    return {
      keyword,
      timeSort,
      page,
      posts,
      hasNextPage,
    };
  },
  privatePosts: (state) => {
    const { keyword, timeSort, limit, page, count, posts, userId } = state.private;
    const hasNextPage = page < count / limit;

    return {
      keyword,
      timeSort,
      page,
      posts,
      hasNextPage,
      userId,
    };
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}