<template>
  <mu-paper class="mu-paper-bottom-nav">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video" />
      <mu-bottom-nav-item value="music" title="Music" icon="music_note" />

      <mu-bottom-nav-item value="books" title="Books" icon="books">
        <router-link to="/foo">
          <div style="flex-direction: column; display: flex;">
            <i aria-hidden="true" class="mu-icon material-icons mu-bottom-item-icon books" style="font-size: 24px; width: 24px; height: 24px;">books</i>
            <span class="mu-bottom-item-text">Books</span>
          </div>
        </router-link>
      </mu-bottom-nav-item>

      <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo">
        <router-link to="/bar">
          <div style="flex-direction: column; display: flex;">
            <i aria-hidden="true" class="mu-icon material-icons mu-bottom-item-icon photo" style="font-size: 24px; width: 24px; height: 24px;">photo</i>
            <span class="mu-bottom-item-text">Pictures</span>
          </div>
        </router-link>
      </mu-bottom-nav-item>

    </mu-bottom-nav>

  </mu-paper>
</template>
<style>
  .mu-paper-bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .mu-buttom-item a {
    color: #fff;
  }
</style>
<script>
export default {
  data () {
    return {
      bottomNav: 'movies',
      bottomNavColor: 'movies'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>