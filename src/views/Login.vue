<template>
<div class="login">
  <div class="wrap">
    <div class="center">
      <h3 class="title">{{__('platform_name') | toUpperCase}}</h3>
      <el-form label-position="top" :model="form" :rules="rules" ref="form" class="form">
        <el-form-item :label="__('profile_user')" prop="user">
          <el-input v-model="form.user" :placeholder="__('profile_user_placeholder')"></el-input>
        </el-form-item>
        <el-form-item :label="__('profile_pwd')" prop="pwd">
          <el-input type="password" v-model="form.pwd" :placeholder="__('profile_pwd_placeholder')"></el-input>
        </el-form-item>
        <el-form-item class="ft">
          <el-button type="primary" @click.native.prevent="handleSubmit">{{__('submit')}}</el-button>
          <el-button @click.native.prevent="handleReset">{{__('reset')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { __ } from '../service/locale'

export default {
  name: 'login',
  data () {
    return {
      form: {
        user: '',
        pwd: ''
      },
      rules: {
        user: [
          { required: true, message: __('profile_user_placeholder'), trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: __('profile_pwd_placeholder'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['version'])
  },
  mounted () {
    if (this.$route.query && this.$route.query.redirect) {
      this.redirect = decodeURIComponent(this.$route.query.redirect)
    }
  },
  methods: {
    handleReset() {
      this.$refs.form.resetFields()
    },
    handleSubmit (e) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('SIGN_IN', this.form)
            .then(data => {
              if (this.redirect) {
                document.location.href = this.redirect
                return
              }
              document.location.href = '/home'
            })
            .catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

