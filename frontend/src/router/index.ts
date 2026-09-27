import { createRouter, createWebHistory } from 'vue-router';
import { business } from '@/content/business';

declare module 'vue-router' {
  interface RouteMeta {
    /** Page title, shown before the site name in the browser tab. Omit on the home page. */
    title?: string;
    /** Meta description for search results. Falls back to the one in index.html. */
    description?: string;
  }
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (_to, _from, saved) => saved ?? { top: 0 },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: 'About',
        description:
          'FreshRise Cleaning is a family owned carpet and upholstery cleaning company in Four Corners, FL. Same two people every visit, honest room-based pricing.',
      },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/ServicesView.vue'),
      meta: {
        title: 'Services & Pricing',
        description:
          'Carpet, upholstery, mattress and area rug cleaning prices. 3 rooms for $149, 5 rooms for $239, whole home for $329. Minimum service call $119.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: {
        title: 'Request a Free Quote',
        description: `Call or text ${business.phone} or send a request for a free carpet or upholstery cleaning quote in the ${business.serviceArea} area.`,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Page not found' },
    },
  ],
});

const defaultTitle = document.title;
const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
const defaultDescription = descriptionTag?.content ?? '';

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${business.name}` : defaultTitle;
  descriptionTag?.setAttribute('content', to.meta.description ?? defaultDescription);
});

export default router;
