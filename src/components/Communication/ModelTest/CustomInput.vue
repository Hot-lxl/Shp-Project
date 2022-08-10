<template>
    <div style="background:#ccc;height:50px">
        <h2>input包装组件</h2>
        <!-- $emit('input',$event.target.value) -->
        <input :value="value" @input="$emit('input',$event.target.value)" /> 
        <span>{{value}} </span>
    </div>
</template>

<script>
export default {
    props:["value"],
}
</script>

<style>

</style>