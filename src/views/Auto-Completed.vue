<template>
    <div>
    <nav></nav>
		<div id="menu"></div>
		<div class="input-group" style="display: none;">
			<input type="text" class="form-control todo-val" placeholder="todo">
			<div class="input-group-btn">
				<div class="btn btn-default button-add">Add</div>
			</div>
		</div>
    <div id="content">
         
        <div class="inputGroup">
            <mu-flexbox justify="space-around">
                <mu-flexbox-item grow="4">
                    <mu-text-field :label="text" labelFloat v-model="value" />
                </mu-flexbox-item>
                <mu-flexbox-item grow="1">
                    <mu-raised-button v-on:click="updateValue" class="demo-raised-button" icon="add" backgroundColor="#a4c639" />
                </mu-flexbox-item>
            </mu-flexbox>
        </div>
        <list :listData="arrays$"> </list>
    </div>
    </div>
</template>

<style>
    .inputGroup {
        margin: 1em;
    }
    
    .inputGroup.mu-raised-button,
    .inputGroup.mu-text-field {
        min-width: 100%;
    }

    .mu-flexbox-item .mu-text-field, .mu-flexbox-item .mu-raised-button {
        /*width: 100%;*/
        min-width: 100%;
    }

</style>
<script> 
import list from './ListItems' 
import 'rxjs';
import {Observable} from 'rxjs/Observable' 
const $add=document.querySelector('.button-add') 
const clickAdd$=Observable.fromEvent<MouseEvent>($add, 'click') 
const arrays=[ 
    {name: 'Chuck Norris'}, 
    {name: 'Bruce Lee'}, 
    {name: 'Jackie Chan'}, 
    {name: 'Jet Li'}
]
const arr1$ = Observable.from([1, 1, 2, 3, 5, 8, 13]).toArray()
export default {
    data() {
        return {
            value: "",
            text: "Todo",
            num: "12",
            arrays: arrays
        }
    }, 

    subscriptions() {
        return {
            arrays$: this.$watchAsObservable('arrays')
            .pluck('newValue')
            .startWith(this.arrays)
            .map(() => this.arrays)
        }
    },
    methods: {
        updateValue: function (value) {
            this.arrays.push({ name: this.value});
        }
    },
    components: {'list': list}
}

</script>