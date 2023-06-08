<script>
export default {
    name: 'SemesterFormComponent',
    props: {
        basicCourses: [Object] | null,
        majorCourses: [Object] | null,
        minorCourses: [Object] | null,
        semester_number: String
    },
    components: {},
    data() {
        return {
            selected_option: null,
            created_semester_schedule: [],
            semester_cr: 0
        }
    },
    computed: {
        basic_unselected_courses() {
            if (this.basicCourses) {
                const c = this.basicCourses.filter((course) => !course.selected)
                return c
            }
            return null
        },
        major_unselected_courses() {
            if (this.majorCourses) {
                const c = this.majorCourses.filter((course) => !course.selected)
                return c
            }
            return null
        },
        minor_unselected_courses() {
            if (this.minorCourses) {
                const c = this.minorCourses.filter((course) => !course.selected)
                return c
            }
            return null
        }
    },
    watch: {
        selected_option(newChoice, oldChoice) {
            if (newChoice) {
                this.semester_cr += newChoice.credits
                this.created_semester_schedule.push(newChoice)
                this.$emit('addCourse', newChoice)
                this.selected_option = 0
            }
        }
    },
    methods: {
        remove_course(rm_course) {
            this.semester_cr -= rm_course.credits
            this.created_semester_schedule = this.created_semester_schedule.filter(
                (course) => course.code != rm_course.code
            )
            this.$emit('removeCourse', rm_course)
        }
    }
}
</script>

<template>
    <div class="m-4 mb-6 pt-2">
        <div class="is-flex is-justify-content-space-between mb-2">
            <div>
                <p class="has-text-weight-bold is-size-5">{{ this.semester_number }}. Semester</p>
                <p class="has-text-info">{{ semester_cr }} semester credits</p>
            </div>
            <div class="ml-6 is-flex is-flex-direction-column">
                <div
                    v-if="
                        basic_unselected_courses &&
                        major_unselected_courses &&
                        minor_unselected_courses
                    "
                    class="mr-3"
                >
                    Select courses:
                </div>
                <div
                    v-if="
                        basic_unselected_courses &&
                        major_unselected_courses &&
                        minor_unselected_courses
                    "
                    class="select"
                >
                    <select v-model="selected_option">
                        <option
                            v-for="course in this.basic_unselected_courses"
                            :key="course.code"
                            :value="course"
                        >
                            {{ course.credits }} cr -- Basic -- {{ course.name }}
                        </option>
                        <option
                            v-for="course in this.major_unselected_courses"
                            :key="course.code"
                            :value="course"
                        >
                            {{ course.credits }} cr -- Major -- {{ course.name }}
                        </option>
                        <option
                            v-for="course in this.minor_unselected_courses"
                            :key="course.code"
                            :value="course"
                        >
                            {{ course.credits }} cr -- Minor -- {{ course.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th class="p-3">Code</th>
                    <th class="p-3">Name</th>
                    <th class="p-3">Credits</th>
                    <th class="p-3">Course Level</th>
                    <th class="p-3">Url</th>
                    <th class="p-3">Period</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="course in created_semester_schedule">
                    <td class="p-2">{{ course.code }}</td>
                    <td class="p-2">{{ course.name }}</td>
                    <td class="p-2">{{ course.credits }}</td>
                    <td class="p-2">{{ course.course_level }} Studies</td>
                    <td class="p-2">
                        <a target="_blank" rel="noopener noreferrer" v-bind:href="course.url"
                            >Link</a
                        >
                    </td>
                    <td class="p-2">{{ course.period }}</td>
                    <td style="width: 60px">
                        <button
                            @click="remove_course(course)"
                            class="button is-small has-background-danger-light has-text-danger"
                        >
                            <i class="fa-solid fa-delete-left mr-2"></i>Remove
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
