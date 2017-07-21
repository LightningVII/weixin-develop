<template>
  <div>
    <mu-appbar>
      <mu-icon-button icon="menu" slot="left" @click="toggle(true)" />
      
      <!--<mu-flat-button color="white" label="Search" slot="right" />-->
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="菜单 1" />
        <mu-menu-item title="菜单 2" />
      </mu-icon-menu>
      <mu-text-field icon="search" class="appbar-search-field" hintText="请输入搜索内容" />
  </mu-appbar>
  <mu-drawer-menu v-bind:open="open" v-bind:docked="docked"></mu-drawer-menu>
  </div>
</template>

<style lang="less">
  .appbar-search-field {
    color: #FFF;
    margin-bottom: 0;
    &.focus-state {
      color: #FFF;
    }
    .mu-text-field-hint {
      color: fade(#FFF, 54%);
    }
    .mu-text-field-input {
      color: #FFF;
    }
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
  }
</style>

<script>
import { __ } from '../service/locale'
import muDrawer from './Menu'
export default {
  name: 'Nav',
  data () {
    return {
      open: false,
      docked: true
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    }
  },
  components: {
    'mu-drawer-menu': muDrawer
  }
}
  
</script>