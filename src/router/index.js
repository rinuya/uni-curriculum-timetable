import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/all-courses',
            name: 'all-courses',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AllCoursesView.vue')
        },
        {
            path: '/create-timetable',
            name: 'create-timetable',
            component: () => import('../views/CreateTimetableView.vue')
        }
    ]
})

export default router
