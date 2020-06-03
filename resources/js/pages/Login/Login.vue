<template>
<!--    <div v-if="!isAuthenticated">-->
        <div class="row  mt-10">
            <div class="col-12">
                <div class="row categoryTitle mt-10">
                    <div class="col-12">
                        <h2>Login Form</h2>

                        <div class="container">
                            <label>
                                <b>Email</b>
                                <input v-model="email" type="text" placeholder="Enter Email">
                            </label>

                            <label>
                                <b>Password</b>
                                <input v-model="password" type="password" placeholder="Enter Password">
                            </label>

<!--                            <label-->
<!--                                v-if="authFailed"-->
<!--                                class="text-danger"-->
<!--                            >Bad credeintials</label>-->
<!--                            <button type="submit" @click="onLoginPressed">-->
<!--                                Login-->
<!--                            </button>-->

                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--    </div>-->
<!--    <div v-else>-->
<!--        <h2>Logout Form</h2>-->

<!--        <button class="button button2" type="submit" @click="logout">-->
<!--            Logout-->
<!--        </button>-->

<!--    </div>-->

</template>

<!--<script>-->

<!--    import loginMutations from 'pages/public/login/store/mutations'-->
<!--    import loginGetters from 'pages/public/login/store/getters'-->
<!--    import historyGetters from 'pages/public/history/store/getters'-->
<!--    import RouterContants from '@/router/RouterContants'-->
<!--    import axios from 'axios'-->
<!--    import PublicPageLayout from '../../../layouts/PublicPageLayout'-->
<!--    import globalActions from '../../../store/global/actions'-->
<!--    import globalGetters from '../../../store/global/getters'-->
<!--    import pageActions from './store/actions'-->

<!--    export default {-->
<!--        name: 'Login',-->
<!--        components: {-->
<!--         },-->
<!--        props: {},-->
<!--        data: function () {-->
<!--            return {}-->
<!--        },-->
<!--        computed: {-->
<!--            username: {-->
<!--                get () {-->
<!--                    return this.$store.getters[loginGetters.GET_USERNAME]-->
<!--                },-->
<!--                set (value) {-->
<!--                    this.$store.commit(loginMutations.SET_USERNAME, value)-->
<!--                }-->
<!--            },-->
<!--            password: {-->
<!--                get () {-->
<!--                    return this.$store.getters[loginGetters.GET_PASSWORD]-->
<!--                },-->
<!--                set (value) {-->
<!--                    this.$store.commit(loginMutations.SET_PASSWORD, value)-->
<!--                }-->
<!--            },-->
<!--            authFailed: {-->
<!--                get () {-->
<!--                    return this.$store.getters[globalGetters.IS_LOGGED_IN]-->
<!--                },-->
<!--                set (value) {-->
<!--                    this.$store.commit(loginMutations.SET_AUTHFAILED, value)-->
<!--                }-->
<!--            },-->
<!--            isAuthenticated () {-->
<!--                return this.$store.getters[globalGetters.IS_LOGGED_IN]-->

<!--            },-->
<!--            users () {-->
<!--                return this.$store.getters[loginGetters.GET_USER]-->

<!--            },-->
<!--            orders () {-->
<!--                return this.$store.getters[historyGetters.GET_ORDERS]-->

<!--            }-->

<!--        },-->

<!--        mounted () {-->
<!--            this.$store.dispatch(pageActions.FETCH_PAGE_DETAILS)-->
<!--        },-->

<!--        methods: {-->

<!--            onLoginPressed: function () {-->
<!--                this.$store.dispatch(globalActions.LOGIN_USER, { username: this.username, password: this.password })-->

<!--                // let ct = 0-->
<!--                // for (let item in this.users) {-->
<!--                //   if (this.$store.getters[loginGetters.GET_USERNAME] === this.users[item].username-->
<!--                //     && this.$store.getters[loginGetters.GET_PASSWORD] === this.users[item].password) {-->
<!--                //     this.$store.commit(loginMutations.SET_CURRENT_USER, this.users[item])-->
<!--                //     ct = 1-->
<!--                //     this.$router.push(RouterContants.HOME)-->
<!--                //   }-->
<!--                // }-->
<!--                // if (ct === 0) {-->
<!--                //   this.$store.commit(loginMutations.SET_AUTHFAILED, true)-->
<!--                // }-->

<!--            },-->

<!--            logout () {-->
<!--                this.$store.dispatch(globalActions.LOGOUT_USER)-->
<!--            },-->

<!--            onNavigateHistory () {-->
<!--                this.$router.push(RouterContants.HISTORY)-->
<!--            },-->
<!--            onSigninPressed () {-->
<!--                this.$router.push(RouterContants.SIGNIN)-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<style scoped>
    body {
        font-family: Arial, Helvetica, sans-serif;
    }

    form {
        border: 3px solid #f1f1f1;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

    button {
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    button:hover {
        opacity: 0.8;
    }

    .cancelbtn {
        width: auto;
        padding: 10px 18px;
        background-color: #f44336;
    }

    .imgcontainer {
        text-align: center;
        margin: 24px 0 12px 0;
    }

    img.avatar {
        width: 40%;
        border-radius: 50%;
    }

    .container {
        padding: 16px;
    }

    span.psw {
        float: right;
        padding-top: 16px;
    }

    /* Change styles for span and cancel button on extra small screens */
    @media screen and (max-width: 300px) {
        span.psw {
            display: block;
            float: none;
        }

        .cancelbtn {
            width: 100%;
        }
    }

    .button2 {
        background-color: #008CBA;
    }

    .button3 {
        background-color: #f44336;
    }

</style>
