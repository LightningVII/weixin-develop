<template>
	<div class="layout" id="">
		<navigator></navigator>
		<div class="input-group" style="display: none;">
			<input type="text" class="form-control todo-val" placeholder="todo">
			<div class="input-group-btn">
				<div class="btn btn-default button-add">Add</div>
			</div>
		</div>
		<router-view></router-view>

		<bottomNav></bottomNav>
	</div>


</template>

<script>
import nav from './Nav'
import bottomNav from './BottomNav'
export default {
  name: 'App',
  components: {
    'navigator': nav,
		'bottomNav': bottomNav
  }
}
</script>