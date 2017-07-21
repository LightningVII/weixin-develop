<template>
<div class="pushable">
  <div class="sidebar">
    <div class="topbar">
      <h3 class="title">{{__('platform_name') | toUpperCase}} <span class="version">( v{{version}} )</span></h3>
    </div>
    <router-link :to="menu.link" v-for="menu in menus">
      <span class="item" ><i :class="menu.icon + ' icon'"></i> {{ menu.name }}</span>
    </router-link>
    <div class="ft">
      <router-link to="logout">
        <span><i class="power icon"></i>{{__('logout')}}</span>
      </router-link>
    </div>
  </div>
  <div class="container">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  data () {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters(['version'])
  },
  mounted () {
    this.menus = [
      {
        name: this.__('menu_home'),
        icon: 'home',
        link: '/home'
      }
    ]
  }
}
</script>

