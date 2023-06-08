<script>
import courses from '../data/courses.json'
import SemesterForm from '../components/SemesterForm.vue'

export default {
    name: 'CreateTimeTable',
    components: {
        SemesterForm
    },
    data() {
        return {
            courses: courses,
            major: null,
            minor: null,

            basic_courses: null,
            major_courses: null,
            minor_courses: null,

            selected_basic_courses_cr: 0,
            selected_major_courses_cr: 0,
            selected_minor_courses_cr: 0,

            total_cr: 0
        }
    },
    watch: {
        major(newMajor, oldMajor) {
            if (this.major) {
                const basic_list = courses
                    .filter((course) => course.basic_studies_for.includes(this.major))
                    .map((course) => {
                        if (!course.hasOwnProperty('selected')) {
                            course.selected = false
                        }
                        return course
                    })
                const major_list = courses
                    .filter(
                        (course) =>
                            course.major_studies_for.includes(this.major) &&
                            !this.basic_courses?.includes(course)
                    )
                    .map((course) => {
                        if (!course.hasOwnProperty('selected')) {
                            course.selected = false
                        }
                        return course
                    })
                this.basic_courses = basic_list
                this.major_courses = major_list
            }
        },
        minor(newMinor, oldMinor) {
            if (this.minor) {
                const minor_list = courses
                    .filter(
                        (course) =>
                            course.minor_studies_for.includes(this.minor) &&
                            !this.major_courses?.includes(course) &&
                            !this.basic_courses?.includes(course)
                    )
                    .map((course) => {
                        if (!course.hasOwnProperty('selected')) {
                            course.selected = false
                        }
                        return course
                    })
                this.minor_courses = minor_list
            }
        }
    },
    methods: {
        handle_add_course(course) {
            let course_type = 'elective'
            if (course.basic_studies_for.includes(this.major)) {
                for (let i = 0; i < this.basic_courses.length; i++) {
                    if (this.basic_courses[i].name == course.name) {
                        this.basic_courses[i].selected = true
                    }
                }
                this.selected_basic_courses_cr += course.credits
            } else if (course.major_studies_for.includes(this.major)) {
                for (let i = 0; i < this.major_courses.length; i++) {
                    if (this.major_courses[i].name == course.name) {
                        this.major_courses[i].selected = true
                    }
                }
                this.selected_major_courses_cr += course.credits
            } else if (course.minor_studies_for.includes(this.minor)) {
                for (let i = 0; i < this.minor_courses.length; i++) {
                    if (this.minor_courses[i].name == course.name) {
                        this.minor_courses[i].selected = true
                    }
                }
                this.selected_minor_courses_cr += course.credits
            } else {
                console.log('No Elective courses added yet')
            }
            this.total_cr += course.credits
        },
        handle_remove_course(course) {
            if (course.basic_studies_for.includes(this.major)) {
                for (let i = 0; i < this.basic_courses.length; i++) {
                    if (this.basic_courses[i].name == course.name) {
                        this.basic_courses[i].selected = false
                    }
                }
                this.selected_basic_courses_cr -= course.credits
            } else if (course.major_studies_for.includes(this.major)) {
                for (let i = 0; i < this.major_courses.length; i++) {
                    if (this.major_courses[i].name == course.name) {
                        this.major_courses[i].selected = false
                    }
                }
                this.selected_major_courses_cr -= course.credits
            } else if (course.minor_studies_for.includes(this.minor)) {
                for (let i = 0; i < this.minor_courses.length; i++) {
                    if (this.minor_courses[i].name == course.name) {
                        this.minor_courses[i].selected = false
                    }
                }
                this.selected_minor_courses_cr -= course.credits
            } else {
                console.log('no elective studies added yet')
            }
            this.total_cr -= course.credits
        }
    }
}
</script>

<template>
    <div class="is-flex">
        <div>
            <div class="is-flex is-align-items-center m-4">
                <p class="mr-3">Select a Major</p>
                <div class="select">
                    <select v-model="major">
                        <option value="DSD">Digital Systems and Design</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="is-flex is-align-items-center m-4">
            <p class="mr-3">Select a Minor</p>
            <div class="select">
                <select v-model="minor">
                    <option value="CS">Computer Science</option>
                </select>
            </div>
        </div>
    </div>

    <div class="m-4">
        <p class="has-text-weight-semibold">Status:</p>
        <p class="has-text-danger" v-if="selected_basic_courses_cr != 65">
            <i class="fa-solid fa-xmark"></i><span class="ml-2">Basic studies missing</span>
        </p>
        <p class="has-text-success" v-if="selected_basic_courses_cr == 65">
            <i class="fa-solid fa-check"></i><span class="ml-2">All Basic studies included</span>
        </p>

        <p class="has-text-danger" v-if="selected_major_courses_cr != 65">
            <i class="fa-solid fa-xmark"></i><span class="ml-2">Major studies missing</span>
        </p>
        <p class="has-text-success" v-if="selected_major_courses_cr == 65">
            <i class="fa-solid fa-check"></i><span class="ml-2">All Major studies included</span>
        </p>

        <p class="has-text-info mt-1 mb-4">Currently {{ total_cr }} / 180 required credits</p>
    </div>
    <div>
        <SemesterForm
            semester_number="1"
            :basic-courses="basic_courses"
            :major-courses="major_courses"
            :minor-courses="minor_courses"
            @add-course="handle_add_course"
            @remove-course="handle_remove_course"
        />
        <SemesterForm
            semester_number="2"
            :basic-courses="basic_courses"
            :major-courses="major_courses"
            :minor-courses="minor_courses"
            @add-course="handle_add_course"
            @remove-course="handle_remove_course"
        />
        <SemesterForm
            semester_number="3"
            :basic-courses="basic_courses"
            :major-courses="major_courses"
            :minor-courses="minor_courses"
            @add-course="handle_add_course"
            @remove-course="handle_remove_course"
        />
        <SemesterForm
            semester_number="4"
            :basic-courses="basic_courses"
            :major-courses="major_courses"
            :minor-courses="minor_courses"
            @add-course="handle_add_course"
            @remove-course="handle_remove_course"
        />
        <SemesterForm
            semester_number="5"
            :basic-courses="basic_courses"
            :major-courses="major_courses"
            :minor-courses="minor_courses"
            @add-course="handle_add_course"
            @remove-course="handle_remove_course"
        />
        <SemesterForm
            semester_number="6"
            :basic-courses="basic_courses"
            :major-courses="major_courses"
            :minor-courses="minor_courses"
            @add-course="handle_add_course"
            @remove-course="handle_remove_course"
        />
    </div>
    <div>
        <button class="button is-primary mb-6 ml-4">Export to:</button>
    </div>
</template>
