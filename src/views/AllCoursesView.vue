<script>
import courses from '../data/courses.json'

export default {
    name: 'AllCoursesView',
    components: {},
    data() {
        return {
            courses: courses
        }
    },
    methods: {}
}
</script>

<template>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth m-4">
        <thead>
            <tr>
                <th class="p-3">Code</th>
                <th class="p-3">Name</th>
                <th class="p-3">Credits</th>
                <th class="p-3">Course Level</th>
                <th class="p-3">Url</th>
                <th class="p-3">Period</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="course in courses">
                <td class="p-2">{{ course.code }}</td>
                <td class="p-2">{{ course.name }}</td>
                <td class="p-2">{{ course.credits }}</td>
                <td class="p-2">{{ course.course_level }} Studies</td>
                <td class="p-2">
                    <a target="_blank" rel="noopener noreferrer" v-bind:href="course.url">Link</a>
                </td>
                <td class="p-2">{{ course.period }}</td>
            </tr>
        </tbody>
    </table>
    <div></div>
</template>
