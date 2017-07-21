<template>
  <mu-list>
    <mu-list-item v-for="item in columns" :title="item.name">
      <mu-icon value="clear" slot="right" />
    </mu-list-item>
  </mu-list>
</template>

<script>
export default {
  props: {
    listData: Array,
  },
  data () {
    return {
      columns: this.listData
    }
  },
}
</script>