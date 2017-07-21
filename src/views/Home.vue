<template>
<div class="login">
  <div class="wrap">
    <div class="center">
      Wellcome {{user.user.name}} <br>
      {{new Date() | dateFormat('%F %T')}}
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { __ } from '../service/locale'

export default {
  name: 'Home',
  computed: {
    ...mapState(['user'])
  },
  beforeMount () {
    this.$store.dispatch('GET_USER', this.form)
      .catch(err => {
        console.error(err)
        this.$message({
          message: err,
          type: 'error'
        })
      })
  }
}
</script>
