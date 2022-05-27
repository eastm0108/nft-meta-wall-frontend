import router from './router'
import store from './store'
import { getLocalStorageToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login','/signup'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getLocalStorageToken();

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page

      next({ path: '/' });
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const isLogin = store.getters['user/isLogin'];

      if (isLogin) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // const { roles } = await store.dispatch('user/getInfo')

          // // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetLocalStorageToken');
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
})

router.afterEach(() => {
})