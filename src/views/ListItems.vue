<template>
  <div id="listItems">
    
  <mobile-tear-sheet>
    <mu-list>
      <mu-list-item v-for="item in listData" :title="item.name">
        <mu-icon value="clear" slot="right" />
      </mu-list-item>
    </mu-list>
  </mobile-tear-sheet>
  </div>
</template>


<script>
import { __ } from '../service/locale'
import mobileTearSheet from './MobileTearSheet'
import list from './MuListItem'
const arrays = [
    { name: 'Chuck Norris', power: 2000 },
    { name: 'Bruce Lee', power: 9000 },
    { name: 'Jackie Chan', power: 7000 },
    { name: 'Jet Li', power: 8000 }
]


export default {
  props: {
    listData: Array,
  },

  methods: {
    updateValue: function (value) {
      console.log(value)
      console.log(this.value)
 
    }
  },
  components: {
    'mobile-tear-sheet': mobileTearSheet,
    'list': list
  }
}
</script>