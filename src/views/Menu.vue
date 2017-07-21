<template>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
        <mu-list @itemClick="docked ? '' : toggle()">

            <mu-list-item>
                <router-link to="/foo">
                    <div class="mu-item-title">Menu Item 1</div>
                </router-link>
            </mu-list-item>
            <mu-list-item>
                <router-link to="/bar">
                    <div class="mu-item-title">Menu Item 2</div>
                </router-link>
            </mu-list-item>



            <mu-list-item title="Menu Item 3" />

            <mu-list-item v-if="docked" @click.native="open = false" title="Close" />

        </mu-list>
    </mu-drawer>

</template>
<style>
    .mu-item-title {
        color:rgba(0,0,0,.87);
    }
</style>
<script>

export default {
    props: {
    open: Boolean,
    docked: Boolean
  },

  methods: {
    toggle (flag) {
        // console.log(this)
      this.$parent.open = !this.$parent.open
      this.$parent.docked = !flag
    }
  }
}
</script>